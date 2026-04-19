from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
import requests

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str

@router.post("/chat/")
async def chatbot_response(request: ChatRequest, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="❌ La clé API est manquante dans la requête !")

    api_key = authorization.replace("Bearer ", "").strip()

    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        system_prompt = (
            "Tu es un assistant IA médical et généraliste. "
            "Tes réponses doivent être précises et adaptées au contexte. "
            "Réponds toujours dans la langue de la question posée. "
            "Si on te pose une question sur une capitale d'un pays (ex: 'Quelle est la capitale de la France ?' ou 'Quelle est la capitale de l'Allemagne ?'), "
            "réponds uniquement avec le nom de la capitale sans ajouter d'autres informations inutiles. "
            "Exemple : 'Quelle est la capitale de l'Italie ?' -> 'Rome.' "
            "Si l'utilisateur te salue ('bonjour', 'salut', 'hello'), réponds avec une courte salutation amicale. "
            "Si l'utilisateur dit 'merci', réponds avec une phrase de courtoisie appropriée. "
            "Si la question concerne un sujet médical sérieux (comme le cancer), assure-toi d'ajouter une note de prudence et de recommander une consultation spécialisée."
        )

        user_input = request.prompt.strip()

        # ✅ Améliorer le payload pour correspondre au modèle
        payload = {
            "inputs": f"{system_prompt}\n\nUtilisateur : {user_input}\n\nAssistant :",
            "parameters": {
                "max_length": 150,  # Réduire la longueur pour des réponses concises
                "temperature": 0.3,  # Réduire la température pour des réponses plus précises
                "top_p": 0.7  # Contrôler la diversité de la sortie
            }
        }

        # ✅ Utiliser un modèle pris en charge par Hugging Face
        response = requests.post(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",  # Mis à jour ici
            headers=headers,
            json=payload
        )

        # ✅ Améliorer le traitement de la réponse
        if response.status_code == 200:
            bot_response = response.json()

            # Vérifier que la réponse contient le texte attendu
            if isinstance(bot_response, list) and "generated_text" in bot_response[0]:
                generated_text = bot_response[0]["generated_text"].strip()

                # Extraire le texte après "Assistant :"
                if "Assistant :" in generated_text:
                    generated_text = generated_text.split("Assistant :")[-1].strip()

                return {"response": generated_text}
            else:
                raise HTTPException(status_code=500, detail="❌ 'generated_text' non trouvé dans la réponse.")

        else:
            raise HTTPException(status_code=response.status_code, detail=f"❌ Erreur dans la réponse : {response.text}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Une erreur inattendue s'est produite : {str(e)}")
