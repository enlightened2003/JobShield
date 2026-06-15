# backend/app/schemas/job.py

from pydantic import BaseModel
from typing import List


class JobAnalysisRequest(BaseModel):
    job_description: str


class JobAnalysisResponse(BaseModel):
    risk_score: int
    risk_level: str
    red_flags: List[str]