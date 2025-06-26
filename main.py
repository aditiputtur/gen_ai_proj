from fastapi import FastAPI
from models import RequestBody, ResponseBody
from logic import get_patient_guide
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.post("/generate", response_model = ResponseBody)
def generate(data: RequestBody):
    guide = get_patient_guide(data.user_input)
    return {"response":guide}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now (good for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
