import fastapi
from fastapi.security import OAuth2PasswordRequestForm

import config
from depends import get_db, Session
from . import router
from crud import UserCRUD
from pydantic import BaseModel, Field


class LoginResponse(BaseModel):
    access_token: str = Field(..., title='Access token')
    expire: int = Field(..., title='Expire timestamp')


@router.post(
    '/login',
    responses={
        200: {'description': 'Login successful'},
        401: {'description': 'Invalid email or password'},
    },
    response_model=LoginResponse,
    summary='Авторизация пользователя',
)
async def login(
        form: OAuth2PasswordRequestForm = fastapi.Depends(),
        db: Session = fastapi.Depends(get_db)):
    try:
        token = UserCRUD.authorize(db, form.username, form.password)
    except ValueError as e:
        raise fastapi.HTTPException(401, detail='Invalid email or password')
    return {
        'access_token': token,
        'expire': config.ACCESS_TOKEN_EXPIRE_SECONDS
    }
