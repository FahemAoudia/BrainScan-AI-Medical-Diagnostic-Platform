from sqlalchemy import Column, Integer, String, Boolean,DateTime, Date, Time,Enum, Text, ForeignKey, create_engine, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from sqlalchemy.sql import text 
from pymongo import MongoClient
import logging





logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATABASE_URL = "mysql+pymysql://root:rootpassword@mysql/brainscandb"
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

MONGO_URI = "mongodb+srv://aoudiafahem:azert123@aoudiafahem.jd0fc.mongodb.net/?retryWrites=true&w=majority&appName=aoudiafahem"
client = MongoClient(MONGO_URI)
mongo_db = client["brainscandb"]


# ✅ Création de la base de données
Base = declarative_base()

def is_mysql_available():
    try:
        session = SessionLocal()
        session.execute(text("SELECT 1"))  
        session.close()
        return True
    except Exception as e:
        logger.error(f"MySQL Error: {e}")
        return False

def is_mongo_available():
    try:
        client.admin.command("ping")  
        return True
    except Exception as e:
        logger.error(f"MongoDB Error: {e}")
        return False

def get_database():
    if is_mysql_available():
        logger.info("✅ Using MySQL Database")
        return SessionLocal()
    elif is_mongo_available():
        logger.warning("⚠️ MySQL n'est pas disponible, MongoDB sera utilisé !")
        return mongo_db
    else:
        logger.critical("❌ MySQL et MongoDB ne sont pas disponibles !")
        return None





from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime










class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("users.id"))
    doctor_id = Column(Integer, ForeignKey("users.id"))
    diagnosis = Column(String(255), nullable=False)
    report_url = Column(String(255), nullable=False)
    scan_image_url = Column(String(255), nullable=True)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    # Vérifie si confidence est présent
    confidence = Column(Float, nullable=True)  # ✅ Ajoute ce champ si nécessaire

    patient = relationship("User", foreign_keys=[patient_id])
    doctor = relationship("User", foreign_keys=[doctor_id])






# ✅ Définition de la table des utilisateurs
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(10), nullable=False)  # "admin", "doctor", "patient"
    doctor_code = Column(String(50), nullable=True)
    status = Column(String(10), default="pending")
    created_at = Column(Date, default=func.current_date())  # ✅ Date de création
    updated_at = Column(Date, onupdate=func.current_date())  # ✅ Date de dernière modification

    patient = relationship("Patient", uselist=False, back_populates="user", cascade="all, delete")
    doctor = relationship("Doctor", uselist=False, back_populates="user", cascade="all, delete")
    
    # ✅ Modification des relations pour correspondre à doctor_calendar
    appointments_as_patient = relationship("DoctorCalendar", foreign_keys="[DoctorCalendar.patient_id]", back_populates="patient", cascade="all, delete")
    appointments_as_doctor = relationship("DoctorCalendar", foreign_keys="[DoctorCalendar.doctor_id]", back_populates="doctor", cascade="all, delete")

# ✅ Définition de la table des patients (Patients)
class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    phone = Column(String(20), nullable=True)

    user = relationship("User", back_populates="patient")



# ✅ Définition de la table des médecins
class Doctor(Base):  
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    # تعديل: جعل user_id اختيارياً ليسمح للأدمن بإنشاء الكود مسبقاً
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    specialty = Column(String(255), nullable=True)
    doctor_code = Column(String(50), unique=True, nullable=False)
    
    user = relationship("User", back_populates="doctor")

# ✅ Définition de la table doctor_calendar avec status
class DoctorCalendar(Base):
    __tablename__ = "doctor_calendar"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    status = Column(String(10), default="open")  # ✅ Statut du rendez-vous (ouvert / fermé)
    reason = Column(String(255), nullable=True)  # ✅ Assurez-vous que la colonne raison existe uniquement
    created_at = Column(Date, default=func.current_date())  # ✅ Date de création
    updated_at = Column(Date, onupdate=func.current_date())  # ✅ Date de dernière modification

    patient = relationship("User", foreign_keys=[patient_id], back_populates="appointments_as_patient")
    doctor = relationship("User", foreign_keys=[doctor_id], back_populates="appointments_as_doctor")



class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(String(100), nullable=False)  # معرف المحادثة الفريد
    doctor_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    patient_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    message = Column(Text, nullable=False)  # دعم الرسائل النصية الطويلة
    message_type = Column(Enum("text", "image", "video", name="message_type"), default="text")  # نوع الرسالة
    media_url = Column(String(255), nullable=True)  # رابط الوسائط (اختياري)
    sender = Column(Enum("doctor", "patient", name="sender_type"), nullable=False)  # المرسل
    status = Column(Enum("sent", "delivered", "read", name="message_status"), default="sent")  # حالة الرسالة
    timestamp = Column(DateTime, default=func.now())  # وقت الإرسال تلقائيًا

    # ✅ إنشاء علاقة بين المحادثات والمرضى/الأطباء
    doctor = relationship("User", foreign_keys=[doctor_id])
    patient = relationship("User", foreign_keys=[patient_id])






# ✅ Création des tables si elles n'existent pas lors de l'exécution principale
if __name__ == "__main__":
    db = get_database()
    if isinstance(db, SessionLocal().__class__):
        Base.metadata.create_all(bind=engine)
        print("✅ Les tables ont été créées avec succès !")
    else:
        print("❌ Impossible de créer les tables car MySQL n'est pas disponible.")