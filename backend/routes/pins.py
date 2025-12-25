from fastapi import APIRouter, HTTPException
from uuid import uuid4
from schemas import PinCreate, PinOut, PinsResponse
from repos.memory_repo import get_pins_from_db, add_pin_to_db, get_pin_from_db

router = APIRouter()

@router.post("/pins", response_model=PinOut, status_code=201)
def add_pin(pin: PinCreate):
    new_pin = PinOut(
        id=str(uuid4()),
        owner_id=None,
        **pin.model_dump()
    )
    add_pin_to_db(new_pin)
    return new_pin

@router.get("/pins", response_model=PinsResponse)
def get_pins():
    return get_pins_from_db()

@router.get("/pins/{pin_id}", response_model=PinOut)
def get_pin(pin_id: str):
    pin = get_pin_from_db(pin_id)
    if pin is None:
        raise HTTPException(status_code=404, detail="Pin not found")
    return pin
