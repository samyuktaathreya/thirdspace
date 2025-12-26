from pydantic import BaseModel, Field
from typing import List, Optional, Literal

PinType = Literal["cafe", "library", "college"]

class PinCreate(BaseModel):
    name: str
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    type: PinType
    notes: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=0, le=5)

class PinOut(PinCreate):
    id: str
    owner_id: Optional[str] = None
    photo_url: Optional[str] = None

class PinsResponse(BaseModel):
    pins: List[PinOut]
    total: int