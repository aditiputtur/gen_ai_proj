from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI()

# For static HTML, CSS, JS files
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Serve index.html at root
@app.get("/", response_class=HTMLResponse)
async def serve_home():
    with open("frontend/index.html", "r") as f:
        return f.read()

# Simple request/response model
class RequestBody(BaseModel):
    user_input: str

class ResponseBody(BaseModel):
    response: str

# CORS (safe, works even if opened from file:// or other origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate", response_model=ResponseBody)
async def generate(data: RequestBody):
    # Just return mock response for now
    guide = f"""After a referral for: {data.user_input}, here's what typically happens:

1. You’ll receive a call within a few days to schedule your appointment.
2. You might be asked to fill out medical history forms beforehand.
3. The initial visit includes a consultation and possible tests.
4. Follow-up care is based on your results.

Bring ID, insurance info, and a list of medications."""
    return {"response": guide}
