from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes import users
from app.routes import expenses
from app.routes import categories
from app.routes import analytics

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(expenses.router)
app.include_router(categories.router)
app.include_router(analytics.router)
@app.get("/")
def home():
    return {"message": "Finance SaaS API running"}