from fastapi import APIRouter, HTTPException, Query, Request

from app.limiter import limiter
from app.models import RoastResult
from app.services.steam_roast import build_steam_roast

router = APIRouter(tags=["steam"])


@router.get("/roast/steam", response_model=RoastResult)
@limiter.limit("15/minute")
async def roast_steam(request: Request, handle: str = Query(..., min_length=1, max_length=64)) -> RoastResult:
    handle = handle.strip()
    if not handle:
        raise HTTPException(status_code=400, detail="handle is required")

    # TODO: fetch real playtime/library via the Steam Web API once a key is
    # available (blocked on the account needing $5+ lifetime spend); for now
    # the LLM roasts a believable mock library.
    return await build_steam_roast(handle)
