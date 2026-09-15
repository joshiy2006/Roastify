import base64

import httpx

from app.config import get_settings

TOKEN_URL = "https://accounts.spotify.com/api/token"
API_BASE = "https://api.spotify.com/v1"


class SpotifyAuthError(Exception):
    pass


def _basic_auth_header() -> str:
    settings = get_settings()
    raw = f"{settings.spotify_client_id}:{settings.spotify_client_secret}".encode()
    return base64.b64encode(raw).decode()


async def exchange_code_for_tokens(code: str) -> dict:
    settings = get_settings()
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(
            TOKEN_URL,
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": settings.spotify_redirect_uri,
            },
            headers={
                "Authorization": f"Basic {_basic_auth_header()}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        )
    if response.status_code != 200:
        raise SpotifyAuthError(f"token exchange failed: {response.status_code} {response.text}")
    return response.json()


async def refresh_access_token(refresh_token: str) -> dict:
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(
            TOKEN_URL,
            data={"grant_type": "refresh_token", "refresh_token": refresh_token},
            headers={
                "Authorization": f"Basic {_basic_auth_header()}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        )
    if response.status_code != 200:
        raise SpotifyAuthError(f"token refresh failed: {response.status_code} {response.text}")
    return response.json()


async def fetch_profile(access_token: str) -> dict:
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(f"{API_BASE}/me", headers={"Authorization": f"Bearer {access_token}"})
    if response.status_code != 200:
        raise SpotifyAuthError(f"fetch profile failed: {response.status_code} {response.text}")
    return response.json()


async def fetch_top_artists(access_token: str, limit: int = 10, time_range: str = "medium_term") -> list[dict]:
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(
            f"{API_BASE}/me/top/artists",
            params={"limit": limit, "time_range": time_range},
            headers={"Authorization": f"Bearer {access_token}"},
        )
    if response.status_code != 200:
        raise SpotifyAuthError(f"fetch top artists failed: {response.status_code} {response.text}")
    return response.json().get("items", [])
