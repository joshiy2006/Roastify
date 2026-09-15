import random

from app.models import RoastResult, StatRow
from app.services.llm import LLMError, generate_roast_text
from app.services.steam_mock import generate_steam_library

FALLBACK_TEMPLATES = [
    "You put {hours} hours into {game}. At this point Valve should be paying YOU rent for how much you live there.",
    "{game} for {hours} hours? Your search history is probably just \"how to have other hobbies.\"",
    "Nice library. Shame you only ever launch {game}. The other games are basically a digital haunted house.",
    "You have {hours} hours in {game}. Your character has seen more of the world than you have this year.",
    "Achievement unlocked: {hours} hours in {game}. Achievement locked forever: touching grass.",
]


async def build_steam_roast(handle: str) -> RoastResult:
    games = generate_steam_library()
    top = games[0]
    max_hours = top["hours"]

    prompt = (
        f"platform: steam\nhandle: {handle}\n"
        "top games by hours played: "
        + ", ".join(f"{g['name']} ({g['hours']} hrs)" for g in games)
    )

    try:
        roast_text = await generate_roast_text(prompt)
    except LLMError:
        roast_text = random.choice(FALLBACK_TEMPLATES).format(game=top["name"], hours=top["hours"])

    return RoastResult(
        handle=handle,
        headline="YOUR STEAM LIBRARY, EXPOSED",
        roast=roast_text,
        badge="cave dweller" if top["hours"] > 1000 else "certified addict" if top["hours"] > 300 else "casual-ish",
        stats=[
            StatRow(
                label=g["name"],
                value=f"{g['hours']:,} hrs",
                percent=max(8, round(g["hours"] / max_hours * 100)),
            )
            for g in games
        ],
    )
