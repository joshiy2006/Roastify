from pydantic import BaseModel


class StatRow(BaseModel):
    label: str
    value: str
    percent: float


class RoastResult(BaseModel):
    handle: str
    headline: str
    roast: str
    badge: str
    stats: list[StatRow]
