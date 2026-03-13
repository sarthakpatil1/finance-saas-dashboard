from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas
from app.routes.users import get_current_user

router = APIRouter()


# -----------------------------
# DATABASE DEPENDENCY
# -----------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# CREATE EXPENSE
# -----------------------------

@router.post("/expenses")
def create_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    new_expense = models.Expense(
        amount=expense.amount,
        description=expense.description,
        category_id=expense.category_id,
        date=expense.date,
        user_id=current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


# -----------------------------
# GET ALL EXPENSES
# -----------------------------

@router.get("/expenses")
def get_expenses(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    expenses = (
        db.query(
            models.Expense.id,
            models.Expense.amount,
            models.Expense.description,
            models.Expense.date,
            models.Category.name.label("category")
        )
        .join(models.Category, models.Expense.category_id == models.Category.id)
        .filter(models.Expense.user_id == current_user.id)
        .all()
    )

    # convert SQL rows to dictionaries
    result = []
    for exp in expenses:
        result.append({
            "id": exp.id,
            "amount": exp.amount,
            "description": exp.description,
            "category": exp.category,
            "date": exp.date
        })

    return result


# -----------------------------
# UPDATE EXPENSE
# -----------------------------

@router.put("/expenses/{expense_id}")
def update_expense(
    expense_id: int,
    updated_expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    expense.amount = updated_expense.amount
    expense.description = updated_expense.description
    expense.category_id = updated_expense.category_id
    expense.date = updated_expense.date

    db.commit()
    db.refresh(expense)

    return expense


# -----------------------------
# DELETE EXPENSE
# -----------------------------

@router.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}