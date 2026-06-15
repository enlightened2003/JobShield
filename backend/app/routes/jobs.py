from fastapi import APIRouter, Depends

from app.schemas.job import (
    JobAnalysisRequest,
    JobAnalysisResponse
)

from app.services.scam_detector import (
    analyze_job
)

from app.utils.dependencies import (
    get_current_user
)

from app.models.user import User

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
    current_user: User = Depends(
        get_current_user
    )
):

    result = analyze_job(
        request.job_description
    )

    return result