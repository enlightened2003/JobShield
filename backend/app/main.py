from fastapi import FastAPI

app = FastAPI(
    title="JobShield API",
    description="AI Powered Job Scam Detection Platform",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to JobShield API"
    }