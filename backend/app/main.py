from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes import users
from app.routes import expenses

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(expenses.router)
@app.get("/")
def home():
    return {"message": "Finance SaaS API running"}