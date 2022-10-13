import re
from pydantic import BaseModel, Field, validator

from .. import UniversityPublic, StudyDirectionPublic

def InsNumber(name: str = 'ins_number'):
    def InsNumberValidator(value: str):
        value = str(value).strip()
        if not re.match(r'^[0-9]{3}[ -][0-9]{3}[ -][0-9]{3}[ -][0-9]{2}$', value):
            raise ValueError('Неверный формат СНИЛС')
        return value
    return validator(name, allow_reuse=True)(InsNumberValidator)

class PeoplePublic(BaseModel):
    ins_number: str = Field(..., title='СНИЛС')
    _ins_number_validator = InsNumber()
    university: UniversityPublic = Field(..., title='Университет')
    study: StudyDirectionPublic = Field(..., title='Направление')
    link: str = Field(..., title='Ссылка на источник')
    change: int = Field(..., title='Дата обновления записи о пользователе')
    agreed: bool = Field(..., title='Согласие на зачисление')
    class Config:
        orm_mode = True
