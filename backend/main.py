from fastapi import FastAPI
from routes.upload_img import router as upload_router
from routes.retrieve_data import router as retrieve_router
from utils.prompt_preprocess import prompt_preprocessing
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.include_router(upload_router)
app.include_router(retrieve_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory="images"), name="images")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)