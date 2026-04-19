from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal, Report, User  
from datetime import datetime
import os
from pydantic import BaseModel
from typing import Optional
from routes.generate_pdf import generate_medical_report




router = APIRouter()

class ReportRequest(BaseModel):
    patient_id: int
    doctor_id: int
    diagnosis: str
    confidence: float
    scan_image_url: Optional[str] = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

        

REPORT_FOLDER = "static/reports/"
os.makedirs(REPORT_FOLDER, exist_ok=True)

# ✅ Modifier la route pour enregistrer le rapport en base de données
@router.post("/mysql/generate")
async def generate_medical_report_mysql(report_request: ReportRequest, db: Session = Depends(get_db)):
    print("📥 Données reçues pour le rapport:", report_request.dict())

    # 🔍 Vérifier l'existence du médecin
    doctor = db.query(User).filter(User.id == report_request.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="❌ Médecin introuvable !")

    # 🔍 Vérifier l'existence du patient
    patient = db.query(User).filter(User.id == report_request.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="❌ Patient introuvable !")

    print(f"🟢 Patient ID: {report_request.patient_id}, Doctor ID: {report_request.doctor_id}")

    # ✅ Générer le rapport PDF
    try:
        pdf_path_dict = generate_medical_report(
            patient={"name": patient.name, "email": patient.email},
            doctor={"name": doctor.name, "email": doctor.email},
            diagnosis=report_request.diagnosis,
            confidence=report_request.confidence,
            recommendations="Aucune recommandation spécifiée.",
            scan_image_url=report_request.scan_image_url if report_request.scan_image_url else ""
        )

        if pdf_path_dict is None:
            raise HTTPException(status_code=500, detail="❌ Échec de la génération du rapport.")

        # ✅ Modifier `pdf_url` pour être valide pour le téléchargement HTTP
        # FastAPI Code
        pdf_url = pdf_path_dict["pdf_url"].replace("static/", "static/")  
        pdf_url = f"/{pdf_path_dict['pdf_url']}"  # Ajoute un '/' au début

        print(f"✅ Rapport généré: {pdf_url}")

        # 🚀 **Ajout de l'enregistrement en base de données**
        new_report = Report(
            patient_id=report_request.patient_id,
            doctor_id=report_request.doctor_id,
            diagnosis=report_request.diagnosis,
            confidence=report_request.confidence,
            scan_image_url=report_request.scan_image_url,
            report_url=pdf_url,  # ✅ Sauvegarde l'URL du rapport
            created_at=datetime.utcnow()  # ✅ Ajoute la date d'enregistrement
        )

        db.add(new_report)
        db.commit()
        db.refresh(new_report)

        print(f"📝 Rapport sauvegardé en base de données avec l'ID: {new_report.id}")

        return {"message": "Rapport généré avec succès", "pdf_url": pdf_url}

    except Exception as e:
        print(f"❌ Erreur lors de la génération du rapport: {e}")
        raise HTTPException(status_code=500, detail=f"❌ Échec de la génération du rapport: {str(e)}")




@router.get("/mysql/{patient_id}")
def get_reports_by_patient_id(patient_id: int, db: Session = Depends(get_db)):
    try:
        reports = db.query(Report).filter(Report.patient_id == patient_id).all()

        if not reports:
            raise HTTPException(status_code=404, detail="❌ Aucun rapport trouvé pour ce patient !")

        return reports

    except Exception as e:
        print(f"❌ Erreur lors de la récupération des rapports: {e}")
        raise HTTPException(status_code=500, detail="❌ Erreur lors de la récupération des rapports.")