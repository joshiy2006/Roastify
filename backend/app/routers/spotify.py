import logging
import secrets
from urllib.parse import urlencode

from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import RedirectResponse

from app.config import get_settings
from app.limiter import limiter
from app.models import RoastResult
from app.services.spotify_client import (
    SpotifyAuthError,
    exchange_code_for_tokens,
    fetch_profile,
    fetch_top_artists,
)
from app.services.spotify_roast import build_spotify_roast

logger = logging.getLogger(__name__)

router = APIRouter(tags=["spotify"])

SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_SCOPES = "user-top-read user-read-recently-played"

STATE_COOKIE = "sp_oauth_state"
ACCESS_COOKIE = "sp_at"
REFRESH_COOKIE = "sp_rt"


@router.get("/auth/spotify/login")
@limiter.limit("15/minute")
def spotify_login(request: Request) -> RedirectResponse:
    settings = get_settings()
    if not settings.spotify_client_id:
        raise HTTPException(status_code=501, detail="Spotify OAuth is not configured yet")

    state = secrets.token_urlsafe(16)
    params = {
        "client_id": settings.spotify_client_id,
        "response_type": "code",
        "redirect_uri": settings.spotify_redirect_uri,
        "scope": SPOTIFY_SCOPES,
        "state": state,
    }
    response = RedirectResponse(f"{SPOTIFY_AUTHORIZE_URL}?{urlencode(params)}")
    response.set_cookie(
        STATE_COOKIE,
        state,
        max_age=600,
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
    )
    return response


@router.get("/auth/spotify/callback")
@limiter.limit("15/minute")
async def spotify_callback(
    request: Request,
    code: str | None = Query(default=None),
    state: str | None = Query(default=None),
    error: str | None = Query(default=None),
):
    settings = get_settings()
    frontend = settings.frontend_origins[0] if settings.frontend_origins else "/"
    expected_state = request.cookies.get(STATE_COOKIE)

    if error or not code or not state or state != expected_state:
        logger.warning("Spotify callback rejected: error=%s state_match=%s", error, state == expected_state)
        return RedirectResponse(f"{frontend}/connect/spotify?oauth=error")

    try:
        tokens = await exchange_code_for_tokens(code)
        access_token = tokens["access_token"]
    except (SpotifyAuthError, KeyError):
        logger.exception("Spotify token exchange failed")
        return RedirectResponse(f"{frontend}/connect/spotify?oauth=error")

    response = RedirectResponse(f"{frontend}/loading/spotify?oauth=success")
    response.delete_cookie(STATE_COOKIE)
    response.set_cookie(
        ACCESS_COOKIE,
        access_token,
        max_age=tokens.get("expires_in", 3600),
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
    )
    if tokens.get("refresh_token"):
        response.set_cookie(
            REFRESH_COOKIE,
            tokens["refresh_token"],
            max_age=60 * 60 * 24 * 30,
            httponly=True,
            secure=settings.cookie_secure,
            samesite=settings.cookie_samesite,
        )
    return response


@router.get("/roast/spotify", response_model=RoastResult)
@limiter.limit("15/minute")
async def roast_spotify(request: Request) -> RoastResult:
    access_token = request.cookies.get(ACCESS_COOKIE)
    if not access_token:
        raise HTTPException(status_code=401, detail="Not connected to Spotify")

    try:
        profile = await fetch_profile(access_token)
        top_artists = await fetch_top_artists(access_token)
    except SpotifyAuthError as exc:
        logger.warning("Spotify API call failed for an authenticated session: %s", exc)
        if "403" in str(exc):
            raise HTTPException(
                status_code=403,
                detail=(
                    "Spotify rejected this account. If the app is in Development Mode "
                    "(the default for new apps), only up to 5 Spotify accounts explicitly "
                    "added under Settings -> User Management in the Spotify Developer "
                    "Dashboard can use it, and the app owner's account needs an active "
                    "Premium subscription."
                ),
            ) from exc
        raise HTTPException(status_code=401, detail="Spotify session expired, reconnect") from exc

    handle = profile.get("display_name") or profile.get("id", "mystery listener")
    return await build_spotify_roast(handle, top_artists)
