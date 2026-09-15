"""Placeholder roast generation.

Returns a fixed-shape RoastResult so the frontend and route contracts are
locked in early. Replaced piece by piece: Steam Web API fetching, Spotify
OAuth + stats fetching, and Groq LLM generation each land in their own batch.
"""

from app.models import RoastResult, StatRow


def stub_steam_roast(handle: str) -> RoastResult:
    return RoastResult(
        handle=handle,
        headline="YOUR STEAM LIBRARY, EXPOSED",
        roast=(
            f"{handle}, real Steam data isn't wired up yet, but rest assured: "
            "whatever you actually play, it's probably embarrassing."
        ),
        badge="pending review",
        stats=[
            StatRow(label="(real games load here soon)", value="-- hrs", percent=100),
        ],
    )


def stub_spotify_roast(handle: str) -> RoastResult:
    return RoastResult(
        handle=handle,
        headline="YOUR TOP ARTISTS, ON TRIAL",
        roast=(
            f"{handle}, real Spotify data isn't wired up yet, but your taste is already "
            "on thin ice by default."
        ),
        badge="pending review",
        stats=[
            StatRow(label="(real artists load here soon)", value="--%", percent=100),
        ],
    )
