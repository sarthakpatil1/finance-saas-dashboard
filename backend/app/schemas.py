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