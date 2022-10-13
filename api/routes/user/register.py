from . import router
from crud import UserCRUD, UserRegister, UserPublic
from depends import Depends, get_db, Session, HTTPException
@router.post('/register',
             response_model=UserPublic,
             summary='Регистрация пользователя')
def register(user: UserRegister,
             db: Session = Depends(get_db)) -> UserPublic:
    try:
        return UserCRUD.register(
            db,
            email=user.email,
            password=user.password,
            username=user.username
        )
    except ValueError:
        raise HTTPException(400, detail='User already exists')