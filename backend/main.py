from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.pins import router as pins_router
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI(debug=True)

Path("uploads").mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pins_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
