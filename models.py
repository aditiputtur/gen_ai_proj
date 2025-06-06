from pydantic import BaseModel

class RequestBody(BaseModel):
    user_input: str

class ResponseBody(BaseModel):
    response: str