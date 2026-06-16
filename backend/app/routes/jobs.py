from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.job import (
    JobAnalysisRequest,
    JobAnalysisResponse,
    JobHistoryResponse
)

from app.services.scam_detector import (
    analyze_job
)

from app.utils.dependencies import (
    get_current_user
)

from app.models.user import User
from app.models.job_analysis import JobAnalysis


router = APIRouter(
    prefix="/jobs",
    tags=["Job Analysis"]
)


@router.post(
    "/analyze",
    response_model=JobAnalysisResponse
)
def analyze_job_posting(
    request: JobAnalysisRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Analyze the job posting
    result = analyze_job(
        request.job_description
    )

    # Save analysis to database
    analysis = JobAnalysis(
        user_id=current_user.id,
        job_description=request.job_description,
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        red_flags=", ".join(
            result["red_flags"]
        )
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return result


@router.get(
    "/history",
    response_model=List[JobHistoryResponse]
)
def get_analysis_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    analyses = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.user_id == current_user.id
        )
        .order_by(
            JobAnalysis.created_at.desc()
        )
        .all()
    )

    return analyses

@router.get(
    "/{analysis_id}",
    response_model=JobHistoryResponse
)
def get_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    analysis = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.id == analysis_id,
            JobAnalysis.user_id == current_user.id
        )
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return analysis

@router.delete(
    "/{analysis_id}"
)
def delete_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    analysis = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.id == analysis_id,
            JobAnalysis.user_id == current_user.id
        )
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    db.delete(analysis)
    db.commit()

    return {
        "message": "Analysis deleted successfully"
    }