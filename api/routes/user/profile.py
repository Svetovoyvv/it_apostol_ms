from . import router
from crud import UserModel, UserPublic
from depends import get_current_user, Depends
@router.get('/profile',
            response_model=UserPublic,
            summary='Получить информацию о пользователе')
async def profile(
        user: UserModel = Depends(get_current_user)) -> UserPublic:
    return user
