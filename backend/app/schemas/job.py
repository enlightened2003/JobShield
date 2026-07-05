from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class JobAnalysisRequest(BaseModel):
    job_description: str


class JobAnalysisResponse(BaseModel):
    risk_score: int
    risk_level: str
    red_flags: List[str]
    extracted_text: Optional[str] = None


class JobHistoryResponse(BaseModel):
    id: int
    job_description: str
    risk_score: int
    risk_level: str
    red_flags: str
    created_at: datetime

    class Config:
        from_attributes = True


class JobStatsResponse(BaseModel):
    total_analyses: int
    high_risk: int
    medium_risk: int
    low_risk: int