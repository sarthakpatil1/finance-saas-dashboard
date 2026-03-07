from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas
from app.routes.users import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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
        user_id=current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

@router.get("/expenses")
def get_expenses(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    user = db.query(models.User).filter(models.User.email == current_user).first()

    expenses = db.query(models.Expense).filter(models.Expense.user_id == user.id).all()

    return expenses