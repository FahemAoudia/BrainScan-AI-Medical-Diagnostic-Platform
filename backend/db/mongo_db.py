from pymongo import MongoClient

# ✅ Connexion à MongoDB Atlas
MONGO_URI = "mongodb+srv://aoudiafahem:azert123@aoudiafahem.jd0fc.mongodb.net/"
# ✅ Connexion au client MongoDB
client = MongoClient(MONGO_URI)

# ✅ Sélection de la base de données (elle sera créée automatiquement si elle n'existe pas)
db = client["brain_scan_db"]

# ✅ Définition des collections
patients_collection = db["patients"]
reports_collection = db["reports"]
appointments_collection = db["appointments"]

# ✅ Insertion de données de test si les collections sont vides
if patients_collection.count_documents({}) == 0:
    patients_collection.insert_one({"name": "Test Patient", "email": "test@example.com"})
    print("🟢 Données de test ajoutées à `patients`")

if reports_collection.count_documents({}) == 0:
    reports_collection.insert_one({"patient_id": "1", "doctor_id": "2", "diagnosis": "Test Diagnosis"})
    print("🟢 Données de test ajoutées à `reports`")

if appointments_collection.count_documents({}) == 0:
    appointments_collection.insert_one({"patient_id": "1", "doctor_id": "2", "date": "2025-02-25"})
    print("🟢 Données de test ajoutées à `appointments`")

# ✅ Affichage des collections disponibles
if __name__ == "__main__":
    print("✅ Connexion réussie à la base de données!")
    print("📂 Collections disponibles dans MongoDB:", db.list_collection_names())
