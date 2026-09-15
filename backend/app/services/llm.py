import httpx

from app.config import get_settings

GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = """You are Roastify, a savage-but-funny AI comedian that roasts people based on \
their Spotify or Steam usage stats.

Rules:
- Under 150 words. Punchy and quotable, like a sharp friend clowning you at a party.
- Roast the DATA — their taste, habits, playtime, genres — never the person's identity, race, \
gender, sexuality, disability, appearance, or any protected trait.
- No slurs, no genuinely hateful or cruel language, no real bullying. Playful exaggeration only.
- Vary your opening line — don't always start the same way.
- Reply with ONLY the roast text. No preamble, no quotation marks, no markdown, no explanation."""


class LLMError(Exception):
    pass


async def generate_roast_text(user_prompt: str) -> str:
    settings = get_settings()
    if not settings.groq_api_key:
        raise LLMError("Groq API key is not configured")

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(
                GROQ_CHAT_URL,
                headers={
                    "Authorization": f"Bearer {settings.groq_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": user_prompt},
                    ],
                    "temperature": 0.9,
                    "max_tokens": 200,
                },
            )
    except httpx.HTTPError as exc:
        raise LLMError(f"Groq request errored: {exc}") from exc

    if response.status_code != 200:
        raise LLMError(f"Groq request failed: {response.status_code} {response.text}")

    data = response.json()
    try:
        text = data["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError) as exc:
        raise LLMError(f"Unexpected Groq response shape: {data}") from exc

    return text.strip().strip('"')
