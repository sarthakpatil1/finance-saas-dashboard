from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    
class UserLogin(BaseModel):
    email: str
    password: str
    
class ExpenseCreate(BaseModel):
    amount: float
    description: str
    category_id: int
    
class CategoryCreate(BaseModel):
    name: str


class Category(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True