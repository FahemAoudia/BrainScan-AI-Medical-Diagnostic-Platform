from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal, Chat
from datetime import datetime
from pydantic import BaseModel
import pytz  # ✅ تأكد من استيراد pytz

# تعريف الـ router
chat_router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

local_tz = pytz.timezone("America/Toronto")

# Pydantic model for message input
class MessageCreate(BaseModel):
    chat_id: str
    doctor_id: int
    patient_id: int
    message: str
    message_type: str = "text"
    media_url: str = None
    sender: str  # "doctor" أو "patient"
    timestamp: datetime = datetime.utcnow()

# Route to save a new message
@chat_router.post("/send")
async def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    try:
        print(f"📩 رسالة مستلمة من {message.sender}: {message.message}")

        # ✅ التحقق من أن `patient_id` و `doctor_id` متاحان
        if message.sender == "doctor" and not message.patient_id:
            raise HTTPException(status_code=400, detail="❌ patient_id is required when doctor sends a message")
        if message.sender == "patient" and not message.doctor_id:
            raise HTTPException(status_code=400, detail="❌ doctor_id is required when patient sends a message")

        # ✅ طباعة القيم قبل الإدراج
        print(f"📨 سيتم إدراج البيانات في قاعدة البيانات: chat_id={message.chat_id}, doctor_id={message.doctor_id}, patient_id={message.patient_id}")

        # ✅ ضبط التوقيت إلى مونتريال قبل الحفظ
        current_time = datetime.now(local_tz)

        # ✅ حفظ الرسالة في قاعدة البيانات
        chat_entry = Chat(
            chat_id=message.chat_id,
            doctor_id=message.doctor_id,
            patient_id=message.patient_id,
            message=message.message,
            message_type=message.message_type,
            media_url=message.media_url,
            sender=message.sender,
            timestamp=current_time,  # ✅ استخدام التوقيت المحلي الصحيح
            status="sent"
        )

        db.add(chat_entry)
        db.commit()
        db.refresh(chat_entry)
        print(f"✅ تم حفظ الرسالة بنجاح! التوقيت المحفوظ: {current_time}")
        return {"message": "Message sent successfully!", "data": chat_entry}

    except Exception as e:
        db.rollback()
        print(f"❌ خطأ أثناء حفظ الرسالة: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving message: {e}")
# Route to fetch chat history
@chat_router.get("/{chat_id}")
async def get_chat_history(chat_id: str, db: Session = Depends(get_db)):
    try:
        messages = db.query(Chat).filter(Chat.chat_id == chat_id).order_by(Chat.timestamp).all()
        if not messages:
            raise HTTPException(status_code=404, detail="No messages found for this chat.")
        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching chat history: {e}")