from fastapi import Depends, HTTPException
from crud import UserCRUD, UserModel
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/v1/user/login')
from . import get_db, Session
from loguru import logger

def get_current_user(db: Session = Depends(get_db),
                     token: str = Depends(oauth2_scheme)) -> UserModel:
    user, success = UserCRUD.get_by_token(db, token)
    if not success:
        raise HTTPException(
            status_code=401,
            detail='Token expired or invalid',
        )
    return user
