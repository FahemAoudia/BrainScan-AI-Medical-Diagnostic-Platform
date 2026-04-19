from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from db.database import SessionLocal, User, Doctor
from fastapi.security import OAuth2PasswordRequestForm
import bcrypt
import jwt
import datetime
from db.mongo_db import db 

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

router = APIRouter()

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
    doctor_code: Optional[str] = None  

class UserLogin(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: int = 30):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
def register_user(user: UserCreate, db_sql: Session = Depends(get_db)):
    print(f"🛠 Tentative d'enregistrement de l'utilisateur : {user.email}")

    existing_user = db_sql.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="❌ Cet e-mail est déjà utilisé.")

    doctor_code_cleaned = None
    user_status = "active" if user.role == "patient" else "pending"

    if user.role == "doctor":
        if user.doctor_code:
            doctor_code_cleaned = user.doctor_code.strip().upper()
            print(f"🔍 Vérification du code médecin : {doctor_code_cleaned}")

            doctor_entry = db_sql.query(Doctor).filter(
                Doctor.doctor_code == doctor_code_cleaned,
                Doctor.user_id == None
            ).first()

            if doctor_entry:
                print(f"✅ Code médecin valide : {doctor_code_cleaned}")
                user_status = "active" 
            else:
                print("❌ Code médecin invalide ou déjà utilisé.")
                raise HTTPException(status_code=400, detail="❌ Code médecin invalide ou déjà utilisé.")

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

# استكمال الكود بعد hashed_password
    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password.decode('utf-8'),
        role=user.role,
        doctor_code=doctor_code_cleaned,
        status=user_status
    )

    try:
        db_sql.add(new_user)
        db_sql.commit()
        db_sql.refresh(new_user)

        # ⚡ الخطوة الحاسمة: ربط الكود بالمستخدم الجديد إذا كان طبيباً
        if user.role == "doctor" and doctor_entry:
            doctor_entry.user_id = new_user.id
            db_sql.commit()
            print(f"🔗 Lié le médecin {new_user.name} au code {doctor_code_cleaned}")

        return {"message": "✅ Utilisateur créé avec succès !", "user_id": new_user.id}

    except Exception as e:
        db_sql.rollback()
        print(f"❌ Erreur lors de l'enregistrement : {e}")
        raise HTTPException(status_code=500, detail="Une erreur interne est survenue.")
    
@router.post("/login")
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db_sql: Session = Depends(get_db)):
    db_user = db_sql.query(User).filter(User.email == form_data.username).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="❌ E-mail incorrect.")

    if not bcrypt.checkpw(form_data.password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="❌ Mot de passe incorrect.")

    if db_user.status != "active":
        raise HTTPException(status_code=403, detail="⚠️ Votre compte n'est pas encore activé. Veuillez contacter l'administration.")

    access_token = create_access_token({"sub": db_user.email, "role": db_user.role, "id": db_user.id})
    if db_user.role == "admin":
        return {"message": "✅ Connexion réussie !", "token": access_token, "role": "admin", "redirect": "/SuperAdminPanel"}

    return {"message": "✅ Connexion réussie !", "token": access_token, "role": db_user.role}
