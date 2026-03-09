from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy import extract
from app import models
from app.database import get_db
from app.auth import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/summary")
def get_expense_summary(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    # total expenses
    total = db.query(func.sum(models.Expense.amount))\
        .filter(models.Expense.user_id == current_user.id)\
        .scalar()

    # expenses grouped by category
    category_data = db.query(
        models.Category.name,
        func.sum(models.Expense.amount)
    ).join(models.Expense)\
     .filter(models.Expense.user_id == current_user.id)\
     .group_by(models.Category.name)\
     .all()

    categories = {name: amount for name, amount in category_data}

    return {
        "total_expenses": total or 0,
        "categories": categories
    }
    


@router.get("/monthly")
def get_monthly_expenses(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    results = db.query(
        func.extract("month", models.Expense.created_at).label("month"),
        func.sum(models.Expense.amount).label("total")
    ).filter(
        models.Expense.user_id == current_user.id
    ).group_by(
        "month"
    ).all()

    return [
        {"month": int(r.month), "total": float(r.total)}
        for r in results
    ]