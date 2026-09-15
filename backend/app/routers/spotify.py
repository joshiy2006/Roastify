from urllib.parse import urlencode

from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import RedirectResponse

from app.config import get_settings
from app.limiter import limiter
from app.models import RoastResult
from app.services.stub_roast import stub_spotify_roast

router = APIRouter(tags=["spotify"])

SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_SCOPES = "user-top-read user-read-recently-played"


@router.get("/auth/spotify/login")
@limiter.limit("15/minute")
def spotify_login(request: Request) -> RedirectResponse:
    settings = get_settings()
    if not settings.spotify_client_id:
        raise HTTPException(status_code=501, detail="Spotify OAuth is not configured yet")

    params = {
        "client_id": settings.spotify_client_id,
        "response_type": "code",
        "redirect_uri": settings.spotify_redirect_uri,
        "scope": SPOTIFY_SCOPES,
    }
    return RedirectResponse(f"{SPOTIFY_AUTHORIZE_URL}?{urlencode(params)}")


@router.get("/auth/spotify/callback")
@limiter.limit("15/minute")
def spotify_callback(request: Request, code: str | None = Query(default=None), error: str | None = Query(default=None)):
    # TODO: exchange `code` for an access/refresh token pair and hand the
    # user off to /roast/spotify with a real session. Landing in the batch
    # that wires up Spotify OAuth + stats fetching.
    raise HTTPException(status_code=501, detail="Spotify OAuth token exchange is not implemented yet")


@router.get("/roast/spotify", response_model=RoastResult)
@limiter.limit("15/minute")
def roast_spotify(request: Request, handle: str = Query(..., min_length=1, max_length=64)) -> RoastResult:
    handle = handle.strip()
    if not handle:
        raise HTTPException(status_code=400, detail="handle is required")

    # TODO: use the authenticated user's access token to fetch top
    # tracks/artists/recently-played and hand the stats to the Groq roast
    # generator instead of this placeholder.
    return stub_spotify_roast(handle)
