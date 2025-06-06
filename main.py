from fastapi import FastAPI
from models import RequestBody, ResponseBody
from logic import get_patient_guide

app = FastAPI()

@app.post("/generate", response_model = ResponseBody)
def generate(data: RequestBody):
    guide = get_patient_guide(data.user_input)
    return {"response":guide}