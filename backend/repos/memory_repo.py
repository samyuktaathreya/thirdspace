from schemas import PinCreate, PinOut, PinsResponse

pins = []

def get_pins_from_db():
    return PinsResponse(
            listOfPins=pins,
            total=len(pins)
        )

def add_pin_to_db(newPin):
    pins.append(newPin)

def get_pin_from_db(pin_id: str):
    for pin in pins:
        if pin.id == pin_id:
            return pin
    return None