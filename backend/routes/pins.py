from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from uuid import uuid4
from pathlib import Path
from schemas import PinOut, PinsResponse
from repos.memory_repo import get_pins_from_db, add_pin_to_db, get_pin_from_db

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/pins", response_model=PinOut, status_code=201)
async def add_pin(
    latitude: float = Form(...),
    longitude: float = Form(...),
    name: str = Form(""),
    type: str = Form(""),
    notes: str = Form(""),
    rating: float | None = Form(None),
    photo: UploadFile | None = File(None),
):
    photo_url = None

    if photo is not None:
        # Basic validation: ensure it's an image
        if not photo.content_type or not photo.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Photo must be an image")

        # Save to disk with a unique name
        ext = Path(photo.filename).suffix or ""
        filename = f"{uuid4()}{ext}"
        dest = UPLOAD_DIR / filename

        content = await photo.read()
        dest.write_bytes(content)

        # This is what frontend can store/use in popup
        photo_url = f"/uploads/{filename}"

    new_pin = PinOut(
        id=str(uuid4()),
        owner_id=None,
        latitude=latitude,
        longitude=longitude,
        name=name,
        type=type,
        notes=notes,
        rating=rating,
        photo_url=photo_url,
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
