import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  
from routes.reportsRoutes import router as reports_router  
from routes.appointmentRoutes import router as appointment_router
from routes.authRoutes import router as auth_router
from routes.userRoutes import router as user_router
from routes.aiRoutes import router as ai_router
from routes.appointmentRoutes import router as appointment_router
from routes.reportsRoutes import router as reports_router
from routes.adminRoutes import router as admin_router
from routes.chatbotRoutes import router as chatbot_router
from routes.chat import chat_router  
from sync import sync_reports  
from db.database import Base, engine
import logging

import asyncio 
from contextlib import asynccontextmanager  

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Création des tables + sync au démarrage"""

    try:
        Base.metadata.create_all(bind=engine)
        logging.info("✅ Les tables PostgreSQL ont été créées avec succès.")
    except Exception as e:
        logging.error(f"❌ Erreur lors de la création des tables : {e}")

    # Sync automatique
    task = asyncio.create_task(sync_reports())
    yield
    task.cancel()

app = FastAPI(lifespan=lifespan) 

_allowed = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
_cors_origins = [o.strip() for o in _allowed.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_origin_regex=r"https://.*\.up\.railway\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(user_router, prefix="/api/users", tags=["Users"])
app.include_router(ai_router, prefix="/api/ai", tags=["AI"])
app.include_router(appointment_router, prefix="/api/appointments", tags=["Appointments"])
app.include_router(reports_router, prefix="/api/reports", tags=["Reports"])  # ✅ تأكد من البادئة
app.include_router(appointment_router, prefix="/api")
app.include_router(admin_router, prefix="/api/admin")
app.include_router(chatbot_router, prefix="/api/chatbot", tags=["Chatbot"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])  # إضافة chat_router

app.mount("/static", StaticFiles(directory="static"), name="static")

for route in app.router.routes:
    print(route.path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
