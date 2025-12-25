from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from uuid import uuid4

PinType = Literal["cafe", "library", "college"]

class PinCreate(BaseModel):
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    type: PinType
    notes: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=0, le=5)

class PinOut(PinCreate):
    id: str
    owner_id: Optional[str] = None

class PinsResponse(BaseModel):
    pins: List[PinOut]
    total: int