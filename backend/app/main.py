from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models

from app.routes import users
from app.routes import expenses
from app.routes import categories
from app.routes import analytics


app = FastAPI()

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)
app.include_router(expenses.router)
app.include_router(categories.router)
app.include_router(analytics.router)


@app.get("/")
def home():
    return {"message": "Finance SaaS API running"}