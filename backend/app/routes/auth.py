from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserResponse
)
from app.utils.security import hash_password

from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    Token
)

from app.utils.security import verify_password
from app.utils.jwt import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(
            user.password
        )
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user

@router.post(
    "/login",
    response_model=Token
)
def login(
    user_credentials: UserLogin,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == user_credentials.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user_credentials.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

