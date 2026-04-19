from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


def _openai_key() -> str:
    return (os.getenv("OPENAI_API_KEY") or "").strip()


class ChatRequest(BaseModel):
    prompt: str


# Assistant médical contextuel (pas extracteur JSON — adapté à une conversation utilisateur)
SYSTEM_PROMPT = (
    "You are an assistant for BrainScan, a platform focused on brain MRI analysis assistance. "
    "Answer clearly and professionally. For any medical concern, remind users that information "
    "is not a diagnosis and they must consult a qualified healthcare professional. "
    "Reply in the same language as the user's message."
)


@router.post("/chat/")
async def chatbot_response(request: ChatRequest):
    api_key = _openai_key()
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="Service de chat indisponible : configurez OPENAI_API_KEY sur le serveur.",
        )

    user_input = (request.prompt or "").strip()
    if not user_input:
        raise HTTPException(status_code=400, detail="Message vide.")

    try:
        r = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_input},
                ],
                "temperature": 0,
            },
            timeout=90,
        )
    except requests.RequestException as e:
        logger.exception("OpenAI request failed")
        raise HTTPException(status_code=502, detail=f"Erreur réseau vers OpenAI : {e!s}") from e

    if r.status_code != 200:
        logger.error("OpenAI HTTP %s: %s", r.status_code, r.text[:800])
        raise HTTPException(status_code=r.status_code, detail=r.text[:500])

    try:
        data = r.json()
        text = data["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError, TypeError) as e:
        logger.error("Bad OpenAI JSON: %s", r.text[:500])
        raise HTTPException(status_code=500, detail="Réponse OpenAI invalide.") from e

    return {"response": text}
