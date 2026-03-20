from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt
import os

from app.db import get_db
from app.models import UserCreate, User, Token, TokenData
from app.auth import get_password_hash, verify_password, create_access_token, ALGORITHM, SECRET_KEY

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    from sqlalchemy import text
    query = text("SELECT id, username, email, avatar_url, status, created_at FROM users WHERE username = :username")
    result = await db.execute(query, {"username": token_data.username})
    user = result.mappings().first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/signup", response_model=User)
async def signup(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if user exists
    from sqlalchemy import text
    check_query = text("SELECT 1 FROM users WHERE username = :username OR email = :email")
    result = await db.execute(check_query, {"username": user.username, "email": user.email})
    if result.fetchone():
        raise HTTPException(status_code=400, detail="Username or email already exists")
    
    hashed_password = get_password_hash(user.password)
    # Using SQL directly since we are using async session and I haven't defined SQLAlchemy ORM models yet,
    # but I'll use the Table objects if I had them. For now, I'll use text or just continue with Pydantic for validation.
    # Actually, I should use SQLAlchemy Tables.
    
    from sqlalchemy import text
    query = text("INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash) RETURNING id, username, email, avatar_url, status, created_at")
    result = await db.execute(query, {
        "username": user.username,
        "email": user.email,
        "password_hash": hashed_password
    })
    await db.commit()
    new_user = result.fetchone()
    return new_user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    from sqlalchemy import text
    query = text("SELECT * FROM users WHERE username = :username")
    result = await db.execute(query, {"username": form_data.username})
    user = result.fetchone()
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
