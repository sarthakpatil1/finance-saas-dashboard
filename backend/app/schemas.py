from pydantic import BaseModel
from datetime import date


# -------------------------
# USER SCHEMAS
# -------------------------

class UserCreate(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class User(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True


# -------------------------
# CATEGORY SCHEMAS
# -------------------------

class CategoryCreate(BaseModel):
    name: str


class Category(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


# -------------------------
# EXPENSE SCHEMAS
# -------------------------

class ExpenseCreate(BaseModel):
    amount: float
    description: str
    category_id: int
    date: date


class Expense(BaseModel):
    id: int
    amount: float
    description: str
    category_id: int
    date: date

    class Config:
        from_attributes = True