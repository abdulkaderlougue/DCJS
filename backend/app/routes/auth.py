from fastapi import APIRouter
from app.schemas.auth import BasicAuth, BasicAuthResp
from dotenv import load_dotenv
import os
load_dotenv()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
AUTH_KEY = os.getenv("AUTH_KEY")
router = APIRouter()
# ADMIN_PASSWORD = "" # Simple password gate
# AUTH_KEY = ""

#  just simple auth
@router.post("/", response_model=BasicAuthResp)
def authenticate(data: BasicAuth):
    if data.password == ADMIN_PASSWORD and data.auth_key == AUTH_KEY:
        return {"success": True}
    else:
        return {"success": False}
