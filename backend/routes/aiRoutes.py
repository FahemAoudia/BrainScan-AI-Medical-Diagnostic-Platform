from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from model_ia.inference import predict_tumor

router = APIRouter()

SCAN_FOLDER = "static/scans/"
os.makedirs(SCAN_FOLDER, exist_ok=True)

@router.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(SCAN_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = predict_tumor(file_path)

        result["image_url"] = file_path  

        print(f"✅ Image enregistrée: {file_path}")
        print(f"✅ Résultat: {result}")

        return result
    except Exception as e:
        print(f"❌ Erreur lors du traitement de l'image : {e}")
        raise HTTPException(status_code=500, detail=f"❌ Erreur lors de l'analyse de l'image : {str(e)}")
