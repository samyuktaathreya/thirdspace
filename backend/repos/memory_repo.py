from schemas import PinCreate, PinOut, PinsResponse

memory_db = {}

def get_pins_from_db():
    return PinsResponse(
            pins=memory_db,
            total=len(memory_db)
        )

def add_pin_to_db(newPin):
    memory_db.append(newPin)

def get_pin_from_db(pin_id: str):
    for pin in memory_db:
        if pin.id == pin_id:
            return pin
    return None