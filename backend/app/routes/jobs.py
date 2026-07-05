from typing import List
import os
import shutil

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File
)

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.job import (
    JobAnalysisRequest,
    JobAnalysisResponse,
    JobHistoryResponse,
    JobStatsResponse
)

from app.services.scam_detector import analyze_job
from app.services.ocr_service import extract_text_from_image

from app.utils.dependencies import get_current_user

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

    result = analyze_job(request.job_description)

    analysis = JobAnalysis(
        user_id=current_user.id,
        job_description=request.job_description,
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        red_flags=", ".join(result["red_flags"])
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return result


@router.post(
    "/analyze-image",
    response_model=JobAnalysisResponse
)
def analyze_job_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    extracted_text = extract_text_from_image(file_path)

    print("=" * 50)
    print("OCR Extracted Text:")
    print(extracted_text)
    print("=" * 50)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No text detected in image"
        )

    result = analyze_job(extracted_text)

    analysis = JobAnalysis(
        user_id=current_user.id,
        job_description=extracted_text,
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        red_flags=", ".join(result["red_flags"])
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "risk_score": result["risk_score"],
        "risk_level": result["risk_level"],
        "red_flags": result["red_flags"],
        "extracted_text": extracted_text
    }


@router.get(
    "/history",
    response_model=List[JobHistoryResponse]
)
def get_analysis_history(
    page: int = 1,
    limit: int = 10,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    offset = (page - 1) * limit

    analyses = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.user_id == current_user.id
        )
        .order_by(
            JobAnalysis.created_at.desc()
        )
        .offset(offset)
        .limit(limit)
        .all()
    )

    return analyses


@router.get(
    "/stats",
    response_model=JobStatsResponse
)
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    total_analyses = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.user_id == current_user.id
        )
        .count()
    )

    high_risk = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.user_id == current_user.id,
            JobAnalysis.risk_level == "HIGH"
        )
        .count()
    )

    medium_risk = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.user_id == current_user.id,
            JobAnalysis.risk_level == "MEDIUM"
        )
        .count()
    )

    low_risk = (
        db.query(JobAnalysis)
        .filter(
            JobAnalysis.user_id == current_user.id,
            JobAnalysis.risk_level == "LOW"
        )
        .count()
    )

    return {
        "total_analyses": total_analyses,
        "high_risk": high_risk,
        "medium_risk": medium_risk,
        "low_risk": low_risk
    }


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