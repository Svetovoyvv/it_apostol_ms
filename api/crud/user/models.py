from ..models import user
from pydantic import BaseModel, Field
from pydantic.networks import EmailStr
class UserPublic(BaseModel):
    id: int = Field(..., title='Уникальный идентификатор пользователя')
    username: str = Field(..., title='Имя пользователя')
    email: str = Field(..., title='Электронная почта')
    class Config:
        orm_mode = True
class UserRegister(BaseModel):
    username: str = Field(..., title='Имя пользователя')
    email: EmailStr = Field(..., title='Электронная почта')
    password: str = Field(..., title='Пароль')
    class Config:
        orm_mode = True
