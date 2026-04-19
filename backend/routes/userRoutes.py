import bcrypt
import jwt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal, User
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from typing import Optional  # ✅ Correction de l'erreur en ajoutant cette ligne

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
router = APIRouter()

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_token(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = db.query(User).filter(User.email == payload["sub"]).first()
        if user is None:
            raise HTTPException(status_code=401, detail="Non autorisé")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Le token a expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

@router.get("/me")
async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="❌ Non autorisé")

        user = db.query(User).filter(User.email == email).first()
        if user is None:
            raise HTTPException(status_code=404, detail="❌ Utilisateur introuvable")

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="❌ La session a expiré")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="❌ Non autorisé")

@router.put("/update")
def update_user(user_update: UserUpdate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token, db)
    if user_update.name:
        user.name = user_update.name
    if user_update.email:
        user.email = user_update.email
    if user_update.password:
        user.password = bcrypt.hashpw(user_update.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    db.commit()
    db.refresh(user)
    return {"message": "✅ Les informations de l'utilisateur ont été mises à jour avec succès !"}

@router.delete("/delete")
def delete_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = verify_token(token, db)
    db.delete(user)
    db.commit()
    return {"message": "✅ Le compte a été supprimé avec succès !"}
