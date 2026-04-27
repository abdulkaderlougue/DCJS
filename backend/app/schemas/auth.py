from pydantic import BaseModel

class BasicAuth(BaseModel):
    password: str 
    auth_key: str

class BasicAuthResp(BaseModel):
    success: bool