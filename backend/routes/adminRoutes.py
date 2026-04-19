from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal, Doctor, User
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class DoctorCreate(BaseModel):
    doctor_code: str
    specialty: Optional[str] = None

class UserCreate(BaseModel):
    doctor_code: str
    name: str
    specialty: Optional[str] = None
    status: Optional[str] = "pending"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UpdateStatusRequest(BaseModel):
    status: str


@router.get("/doctors")
def get_all_doctors(db: Session = Depends(get_db)):
    doctors = db.query(Doctor).all()
    return doctors

@router.post("/doctors")
def add_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    # 1. التأكد من أن الكود غير مكرر في قاعدة البيانات
    existing_doctor = db.query(Doctor).filter(Doctor.doctor_code == doctor.doctor_code).first()
    if existing_doctor:
        raise HTTPException(status_code=400, detail="❌ Ce code médecin existe déjà.")

    # 2. إنشاء سجل الطبيب الجديد
    # ملاحظة: user_id سيكون None تلقائياً هنا لأننا لم نمرره، 
    # وهو ما يسمح بإنشاء التخصص قبل وجود الحساب.
    new_doctor = Doctor(
        doctor_code=doctor.doctor_code,
        specialty=doctor.specialty,
        user_id=None  # صراحةً أو ضمناً سيقبل القيمة الفارغة الآن
    )

    try:
        db.add(new_doctor)
        db.commit()
        db.refresh(new_doctor)
        return {"message": "✅ Code Médecin ajouté avec succès !", "doctor": new_doctor}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"❌ Erreur lors de l'ajout: {str(e)}")
    
@router.delete("/doctors/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    try:
        doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
        if not doctor:
            raise HTTPException(status_code=404, detail="❌ code Médecin introuvable.")

        db.delete(doctor)
        db.commit()

        return {"message": "✅ code Médecin supprimé avec succès !"}
    except Exception as e:
        db.rollback()
        print(f"❌ Erreur lors de la suppression code medcin : {e}")
        raise HTTPException(status_code=500, detail="❌ Erreur lors de la suppression du médecin.")

@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).filter(User.role == "doctor").all()
    return users

@router.post("/users")
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.doctor_code == user.doctor_code).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="❌ Ce code médecin existe déjà.")

    new_user = User(
        name=user.name,
        email=f"{user.doctor_code}@example.com",  
        password="default_password", 
        role="doctor",
        doctor_code=user.doctor_code,
        status=user.status,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_doctor = Doctor(
        doctor_code=user.doctor_code,
        specialty=user.specialty,
        user_id=new_user.id
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return {"message": "✅ Utilisateur ajouté avec succès !", "user": new_user}

@router.patch("/users/{user_id}/status")
def update_user_status(user_id: int, request: UpdateStatusRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id, User.role == "doctor").first()
    if not user:
        raise HTTPException(status_code=404, detail="❌ Utilisateur introuvable.")

    user.status = request.status  
    db.commit()
    db.refresh(user)

    return {"message": "✅ Statut de l'utilisateur mis à jour avec succès !"}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.id == user_id, User.role == "doctor").first()
        if not user:
            raise HTTPException(status_code=404, detail="❌ Utilisateur introuvable.")

        db_doctor = db.query(Doctor).filter(Doctor.user_id == user_id).first()
        if db_doctor:
            db.delete(db_doctor)

        db.delete(user)
        db.commit()

        return {"message": "✅ Utilisateur supprimé avec succès !"}
    except Exception as e:
        db.rollback()
        print(f"❌ Erreur lors de la suppression de l'utilisateur: {e}")
        raise HTTPException(status_code=500, detail="❌ Erreur lors de la suppression de l'utilisateur.")