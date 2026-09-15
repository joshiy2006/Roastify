from fastapi import APIRouter, HTTPException, Query, Request

from app.limiter import limiter
from app.models import RoastResult
from app.services.stub_roast import stub_steam_roast

router = APIRouter(tags=["steam"])


@router.get("/roast/steam", response_model=RoastResult)
@limiter.limit("15/minute")
def roast_steam(request: Request, handle: str = Query(..., min_length=1, max_length=64)) -> RoastResult:
    handle = handle.strip()
    if not handle:
        raise HTTPException(status_code=400, detail="handle is required")

    # TODO: fetch real playtime/library via the Steam Web API and hand the
    # stats to the Groq roast generator instead of this placeholder.
    return stub_steam_roast(handle)
