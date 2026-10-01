from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    # Resolved relative to this file (not the process's CWD) so `.env` loads
    # correctly whether uvicorn is launched from backend/ or elsewhere.
    model_config = SettingsConfigDict(env_file=BACKEND_DIR / ".env", extra="ignore")

    frontend_origin: str = "http://localhost:5173"

    spotify_client_id: str = ""
    spotify_client_secret: str = ""
    spotify_redirect_uri: str = "http://localhost:8000/auth/spotify/callback"

    steam_api_key: str = ""

    groq_api_key: str = ""

    # False for local http dev, True in production (https, cross-site cookies)
    cookie_secure: bool = False

    @property
    def cookie_samesite(self) -> str:
        return "none" if self.cookie_secure else "lax"

    @property
    def frontend_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origin.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
