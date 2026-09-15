"""Placeholder Steam library data.

Mirrors the frontend's mock game list (src/data/mockRoast.ts) so the Steam
roast has believable, varied stats to feed the LLM until the real Steam Web
API is wired up (blocked on a non-limited Steam account for the API key).
"""

import random

GAMES = [
    ("Counter-Strike 2", 200, 1800),
    ("Stardew Valley", 50, 400),
    ("Sid Meier's Civilization VI", 30, 600),
    ("Skyrim Special Edition", 40, 900),
    ("Among Us", 10, 150),
    ("Rocket League", 80, 500),
    ("Hollow Knight", 15, 60),
    ("Team Fortress 2", 100, 2000),
    ("Baldur's Gate 3", 40, 300),
    ("Terraria", 25, 350),
]


def generate_steam_library(count: int = 5) -> list[dict]:
    picks = random.sample(GAMES, k=min(count, len(GAMES)))
    games = [{"name": name, "hours": round(random.uniform(lo, hi))} for name, lo, hi in picks]
    return sorted(games, key=lambda g: g["hours"], reverse=True)
