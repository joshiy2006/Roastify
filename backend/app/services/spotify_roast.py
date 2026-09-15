import random
from collections import Counter

from app.models import RoastResult, StatRow

# Same voice as the frontend's mock roasts (src/data/mockRoast.ts), applied to
# real top-artist/genre data pulled from the Spotify API. Swapped out for a
# real Groq-generated roast in a later batch.
ROAST_TEMPLATES = [
    "Your top artist is {artist}. Bold of you to have a personality that fits in one Spotify Wrapped slide.",
    "{percent}% {genre}? Explains a lot about the vibes in your group chat, none of it good.",
    "You’ve streamed {artist} enough that they probably know your Wi-Fi password by now.",
    "Your taste peaked somewhere between \"{genre}\" and whatever made you replay the same 5 songs on loop for a month.",
    "Congrats, your top genre is {genre}. Very brave of you to let that be public information.",
    "{artist} in your top 3? At least the algorithm is honest about your emotional damage.",
]


def build_spotify_roast(handle: str, top_artists: list[dict]) -> RoastResult:
    if not top_artists:
        return RoastResult(
            handle=handle,
            headline="YOUR TOP ARTISTS, ON TRIAL",
            roast=f"{handle}, your top artists list is empty. Somehow that's even more damning.",
            badge="mysteriously silent",
            stats=[],
        )

    top_n = top_artists[:5]
    weights = [round(100 / (i + 2)) for i in range(len(top_n))]
    total = sum(weights) or 1
    percents = [round(w / total * 100) for w in weights]

    genre_counts = Counter(g for artist in top_artists for g in artist.get("genres", []))
    top_genre = genre_counts.most_common(1)[0][0] if genre_counts else "unlabeled chaos"
    top_artist_name = top_n[0]["name"]

    roast = random.choice(ROAST_TEMPLATES).format(
        artist=top_artist_name,
        genre=top_genre,
        percent=percents[0],
    )

    return RoastResult(
        handle=handle,
        headline="YOUR TOP ARTISTS, ON TRIAL",
        roast=roast,
        badge="one-track mind" if percents[0] > 35 else "certified shuffler",
        stats=[
            StatRow(label=artist["name"], value=f"{pct}%", percent=pct * 2.4)
            for artist, pct in zip(top_n, percents)
        ],
    )
