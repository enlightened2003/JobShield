from pydantic import BaseModel
from datetime import datetime
from typing import List


class JobAnalysisRequest(BaseModel):
    job_description: str


class JobAnalysisResponse(BaseModel):
    risk_score: int
    risk_level: str
    red_flags: List[str]


class JobHistoryResponse(BaseModel):
    id: int
    job_description: str
    risk_score: int
    risk_level: str
    red_flags: str
    created_at: datetime

    class Config:
        from_attributes = True