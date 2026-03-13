from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


# -------------------
# USER MODEL
# -------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    expenses = relationship("Expense", back_populates="user")


# -------------------
# CATEGORY MODEL
# -------------------
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

    expenses = relationship("Expense", back_populates="category")


# -------------------
# EXPENSE MODEL
# -------------------
class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    amount = Column(Float, nullable=False)
    description = Column(String, nullable=True)

    # NEW FIELD (Date of transaction)
    date = Column(Date, default=datetime.utcnow)

    created_at = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))

    user = relationship("User", back_populates="expenses")
    category = relationship("Category", back_populates="expenses")