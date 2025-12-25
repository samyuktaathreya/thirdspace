from uuid import uuid4
from schemas import PinOut, PinsResponse

#fake markers for testing
pins: list[PinOut] = [
    PinOut(
        id=str(uuid4()),
        latitude=37.7749,
        longitude=-122.4194,
        type="cafe",
        notes="Nice coffee and WiFi",
        rating=4,
        owner_id=None,
    ),
    PinOut(
        id=str(uuid4()),
        latitude=37.7793,
        longitude=-122.4192,
        type="library",
        notes="Quiet place to study",
        rating=5,
        owner_id=None,
    ),
    PinOut(
        id=str(uuid4()),
        latitude=37.7715,
        longitude=-122.4148,
        type="college",
        notes="Campus vibes",
        rating=3,
        owner_id=None,
    ),
]

def get_pins_from_db() -> PinsResponse:
    return PinsResponse(
        pins=pins,
        total=len(pins),
    )

def add_pin_to_db(new_pin: PinOut):
    pins.append(new_pin)

def get_pin_from_db(pin_id: str):
    for pin in pins:
        if pin.id == pin_id:
            return pin
    return None
