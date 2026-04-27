from fastapi import APIRouter
from app.schemas.auth import BasicAuth, BasicAuthResp
router = APIRouter()
ADMIN_PASSWORD = "dcjs2025" # Simple password gate
AUTH_KEY = "dcjs_admin_auth"

#  just simple auth
@router.post("/", response_model=BasicAuthResp)
def authenticate(data: BasicAuth):
    if data.password == ADMIN_PASSWORD and data.auth_key == AUTH_KEY:
        return {"success": True}
    else:
        return {"success": False}