from fastapi import FastAPI

from app.database.base import Base
from app.database.connection import engine

from app.models.user import User
from app.routes.auth import router as auth_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JobShield API",
    description="AI Powered Job Scam Detection Platform",
    version="1.0.0"
)
app.include_router(auth_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to JobShield API"
    }