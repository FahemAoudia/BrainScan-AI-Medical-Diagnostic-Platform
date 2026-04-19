import asyncio
import logging
from db.database import SessionLocal, mongo_db, Report, is_mysql_available

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def sync_reports():
    """ Synchroniser les rapports MySQL vers MongoDB toutes les 10 secondes automatiquement """
    while True:
        if not is_mysql_available():
            logger.warning("⚠️ MySQL n'est pas disponible, MongoDB sera utilisé uniquement !")
        else:
            session = SessionLocal()
            reports = session.query(Report).all()
            
            mongo_collection = mongo_db["reports"]
            for report in reports:
                report_data = {
                    "id": report.id,
                    "patient_id": report.patient_id,
                    "doctor_id": report.doctor_id,
                    "diagnosis": report.diagnosis,
                    "report_url": report.report_url,
                    "scan_image_url": report.scan_image_url,
                    "created_at": report.created_at,
                }
                mongo_collection.update_one({"id": report.id}, {"$set": report_data}, upsert=True)
            
            logger.info("✅ Les rapports ont été synchronisés avec succès !")

        await asyncio.sleep(10)  # ⏳ 10 secondes entre chaque synchronisation