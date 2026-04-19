from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date, time
from db.database import SessionLocal, DoctorCalendar, User, Patient
from typing import Optional
from datetime import datetime, timedelta, date, time as time_type
from typing import Optional
from routes.utils import send_email_with_report
from db.mongo_db import db
from bson.objectid import ObjectId
from routes.generate_pdf import generate_medical_report
from bson import ObjectId
router = APIRouter(prefix="/reports")


router = APIRouter()

# ✅ Modèle `Pydantic` pour la réservation de rendez-vous
class AppointmentRequest(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_date: date
    appointment_time: str  # ✅ Assurez-vous que l'heure est envoyée sous forme de chaîne "HH:MM"
    phone: Optional[str] = None

# ✅ Fonction pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Réserver un nouveau rendez-vous
@router.post("/book")

async def book_appointment(request: AppointmentRequest, db: Session = Depends(get_db)):
    if request.appointment_date < date.today():
        raise HTTPException(status_code=400, detail="❌ Vous ne pouvez pas réserver un rendez-vous dans le passé !")

    # 🔹 Vérifier si le patient existe dans la base de données
    patient = db.query(User).filter(User.id == request.patient_id).first()
    
    if not patient:
        raise HTTPException(status_code=404, detail="❌ L'utilisateur n'existe pas !")

    # 🔹 Vérifier si le patient a un enregistrement dans la table `patients`
    patient_info = db.query(Patient).filter(Patient.user_id == request.patient_id).first()

    if not patient_info:
        if not request.phone:
            raise HTTPException(status_code=400, detail="❌ Un numéro de téléphone est requis pour la première réservation !")
        
        # ✅ Créer un nouvel enregistrement dans `patients`
        new_patient = Patient(user_id=patient.id, phone=request.phone)
        db.add(new_patient)
        db.commit()
        db.refresh(new_patient)
        patient_phone = request.phone
    else:
        patient_phone = patient_info.phone

    # ✅ Vérifier si le créneau est déjà réservé ou indisponible
    existing_appointment = db.query(DoctorCalendar).filter(
        DoctorCalendar.doctor_id == request.doctor_id,
        DoctorCalendar.date == request.appointment_date,
        DoctorCalendar.time == request.appointment_time,
        DoctorCalendar.status.in_(["booked", "unavailable"])
    ).first()

    if existing_appointment:
        raise HTTPException(status_code=400, detail="❌ Ce créneau n'est pas disponible pour la réservation !")

    # ✅ Créer un nouveau rendez-vous
    new_appointment = DoctorCalendar(
        patient_id=patient.id,
        doctor_id=request.doctor_id,
        date=request.appointment_date,
        time=request.appointment_time,
        status="booked",
        reason="Nouvelle réservation de rendez-vous"
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {"message": "✅ Rendez-vous réservé avec succès !", "appointment_id": new_appointment.id}

# ✅ Récupérer la liste des médecins actifs uniquement
@router.get("/doctors")
async def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(User).filter(User.role == "doctor", User.status == "active").all()

    if not doctors:
        return {"message": "❌ Aucun médecin disponible."}

    return [
        {
            "doctor_id": doc.id,
            "doctor_name": doc.name
        }
        for doc in doctors
    ]

# ✅ Récupérer les rendez-vous d'un médecin donné
@router.get("/doctor/{doctor_id}")
async def get_doctor_appointments(doctor_id: int, db: Session = Depends(get_db)):
    appointments = db.query(DoctorCalendar).filter(DoctorCalendar.doctor_id == doctor_id).all()

    if not appointments:
        return []

    results = []
    for appointment in appointments:
        # 🔹 Obtenir les informations du patient depuis `users`
        patient = db.query(User).filter(User.id == appointment.patient_id).first()
        patient_name = patient.name if patient else "Inconnu"
        patient_email = patient.email if patient else "Inconnu"

        # 🔹 Obtenir le numéro de téléphone depuis `patients`
        patient_info = db.query(Patient).filter(Patient.user_id == appointment.patient_id).first()
        patient_phone = patient_info.phone if patient_info else "Non disponible"

        results.append({
            "id": appointment.id,
            "patient_name": patient_name,
            "patient_email": patient_email,
            "phone": patient_phone,
            "date": appointment.date,
            "time": appointment.time,
            "status": appointment.status
        })

    return results

# ✅ Mettre à jour un rendez-vous
@router.put("/{appointment_id}")
async def update_appointment(appointment_id: int, updated_appointment: AppointmentRequest, db: Session = Depends(get_db)):

    appointment = db.query(DoctorCalendar).filter(DoctorCalendar.id == appointment_id).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="❌ Rendez-vous non trouvé.")

    appointment.date = updated_appointment.appointment_date
    appointment.time = updated_appointment.appointment_time
    appointment.patient_id = updated_appointment.patient_id
    appointment.doctor_id = updated_appointment.doctor_id
    appointment.status = "booked"

    db.commit()
    db.refresh(appointment)

    return {"message": "✅ Rendez-vous mis à jour avec succès !"}

# ✅ Supprimer un rendez-vous
@router.delete("/{appointment_id}")
async def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(DoctorCalendar).filter(DoctorCalendar.id == appointment_id).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="❌ Rendez-vous non trouvé.")
    
    db.delete(appointment)
    db.commit()
    
    return {"message": "✅ Rendez-vous annulé avec succès !"}

# ✅ Récupérer les rendez-vous du patient actuel
@router.get("/patient/appointments/{patient_id}")
async def get_patient_appointments(patient_id: int, db: Session = Depends(get_db)):
    appointments = db.query(DoctorCalendar).filter(DoctorCalendar.patient_id == patient_id).all()

    if not appointments:
        return []

    results = []
    for appointment in appointments:
        doctor = db.query(User).filter(User.id == appointment.doctor_id).first()
        doctor_name = doctor.name if doctor else "Inconnu"

        results.append({
            "id": appointment.id,
            "doctor_name": doctor_name,
            "date": appointment.date,
            "time": appointment.time,
            "status": appointment.status
        })

    return results

# ✅ Récupérer les rendez-vous pour un patient et un médecin spécifiques
@router.get("/doctor/{doctor_id}/patient/{patient_id}")
async def get_appointments_for_doctor_and_patient(doctor_id: int, patient_id: int, db: Session = Depends(get_db)):
    appointments = db.query(DoctorCalendar).filter(
        DoctorCalendar.doctor_id == doctor_id,
        DoctorCalendar.patient_id == patient_id
    ).all()

    if not appointments:
        return []

    results = []
    for appointment in appointments:
        results.append({
            "id": appointment.id,
            "date": appointment.date,
            "time": appointment.time,
            "status": appointment.status,
            "patient_name": appointment.patient.name if appointment.patient else "Inconnu",
            "phone": appointment.patient.patient.phone if appointment.patient and appointment.patient.patient else "Non disponible"
        })

    return results

class UnavailableRequest(BaseModel):
    doctor_id: int 
    date: date
    type: str  
    start_time: Optional[str] = None  
    end_time: Optional[str] = None 


@router.post("/unavailable")
async def set_unavailable(request: UnavailableRequest, db: Session = Depends(get_db)):
    if request.type == "fullDay":
        new_appointment = DoctorCalendar(
            doctor_id=request.doctor_id,  
            date=request.date,
            time=time_type(0, 0),  
            status="unavailable",
            reason="Journée entière indisponible"
        )
        db.add(new_appointment)
        db.commit()
        db.refresh(new_appointment)
        return {"message": "✅ Journée entière marquée comme indisponible !"}

    elif request.type == "timeRange":
        start_time = datetime.strptime(request.start_time, "%H:%M").time()
        end_time = datetime.strptime(request.end_time, "%H:%M").time()

        current_time = start_time
        while current_time <= end_time:
            new_appointment = DoctorCalendar(
                doctor_id=request.doctor_id,  
                date=request.date,
                time=current_time,
                status="unavailable",
                reason="Plage horaire indisponible"
            )
            db.add(new_appointment)
            current_time = (datetime.combine(date.today(), current_time) + timedelta(hours=1)).time()

        db.commit()
        return {"message": "✅ Plage horaire marquée comme indisponible !"}

    else:
        raise HTTPException(status_code=400, detail="❌ Type d'indisponibilité invalide !")



@router.get("/doctor/{doctor_id}")
async def get_doctor_appointments(doctor_id: str):
    appointments = list(db.appointments.find({"doctor_id": doctor_id}))

    if not appointments:
        return []

    results = []
    for appointment in appointments:
        patient = db.patients.find_one({"_id": ObjectId(appointment["patient_id"])})
        patient_name = patient["name"] if patient else "Inconnu"
        patient_email = patient["email"] if patient else "Inconnu"

        results.append({
            "_id": str(appointment["_id"]),  
            "id": str(appointment["_id"]),  
            "patient_name": patient_name,
            "patient_email": patient_email,
            "date": appointment["date"],
            "time": appointment["time"],
            "status": appointment.get("status", "pending")
        })

    return results

@router.post("/generate/{patient_id}")
async def generate_and_send_report(patient_id: str):
    """
    ✅ Générer et envoyer le rapport médical du patient
    """
    print(f"🛠 Patient ID reçu: {patient_id}")  

    patient = db.patients.find_one({"_id": patient_id})  

    if not patient:
        raise HTTPException(status_code=404, detail="❌ Patient introuvable")

    print("✅ Patient trouvé:", patient)  

    doctor = db.patients.find_one({"_id": patient.get("doctor_id")})  
    if not doctor:
        doctor = {"name": "Dr. Inconnu", "specialty": "Généraliste"}  

    last_report = db.reports.find_one({"patient_id": str(patient["_id"])}, sort=[("created_at", -1)])
    if not last_report:
        raise HTTPException(status_code=404, detail="❌ Aucun rapport trouvé pour ce patient.")

    print("✅ Dernier rapport trouvé:", last_report)  

    pdf_path = generate_medical_report(
        patient,
        doctor,
        last_report["diagnosis"],
        last_report["confidence"],
        last_report["recommendations"],
        last_report["scan_image_url"]
    )

    db.reports.update_one({"_id": last_report["_id"]}, {"$set": {"pdf_url": pdf_path}})

    print(f"✅ Rapport généré: {pdf_path}")  

    return {"message": "✅ Rapport généré avec succès !", "pdf_url": pdf_path}

@router.get("/{patient_id}")
async def get_patient_report(patient_id: str):
    """
    ✅ Récupérer le lien du rapport PDF du patient
    """
    print(f"🛠 Patient ID reçu: {patient_id}")

    # ✅ Recherche du dernier rapport
    report = db.reports.find_one({"patient_id": patient_id}, sort=[("created_at", -1)])
    
    if not report:
        raise HTTPException(status_code=404, detail="❌ Aucun rapport trouvé pour ce patient.")

    # ✅ Vérifier que le rapport contient un lien PDF
    if "pdf_url" not in report or not report["pdf_url"]:
        raise HTTPException(status_code=404, detail="❌ Aucun fichier PDF associé à ce rapport.")

    print("✅ Rapport trouvé:", report)

    return {"pdf_url": report["pdf_url"]}

@router.get("/doctor_calendar/doctor/{doctor_id}")
async def get_doctor_appointments(doctor_id: int, db: Session = Depends(get_db)):
    """
    ✅ Récupérer les rendez-vous du médecin
    """
    appointments = db.query(DoctorCalendar).filter(
        DoctorCalendar.doctor_id == doctor_id,
        DoctorCalendar.status == "booked"
    ).all()

    if not appointments:
        return []

    results = []
    for appointment in appointments:
        patient = db.query(User).filter(User.id == appointment.patient_id).first()
        patient_name = patient.name if patient else "Inconnu"
        patient_email = patient.email if patient else "Inconnu"
        patient_info = db.query(Patient).filter(Patient.user_id == appointment.patient_id).first()
        patient_phone = patient_info.phone if patient_info else "Non disponible"

        results.append({
            "id": appointment.id,
            "patient_id": appointment.patient_id,  # ✅ Vérifier l'envoi de `patient_id`
            "patient_name": patient_name,
            "patient_email": patient_email,
            "phone": patient_phone,
            "date": appointment.date.strftime("%Y-%m-%d"),  # ✅ Convertir la date en texte
            "time": appointment.time.strftime("%H:%M"),  # ✅ Convertir l'heure en texte
            "status": appointment.status
        })

    return results
