from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.connection import engine

from app.models.user import User
from app.models.job_analysis import JobAnalysis

from app.routes.auth import router as auth_router
from app.routes import jobs


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JobShield API",
    description="AI Powered Job Scam Detection Platform",
    version="1.0.0"
)

# ----------------------------
# CORS Configuration
# ----------------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://job-shield-sandy.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Routes
# ----------------------------
app.include_router(auth_router)
app.include_router(jobs.router)


@app.get("/")
def root():
    return {
        "message": "Welcome to JobShield API"
    }