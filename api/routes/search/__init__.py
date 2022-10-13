from fastapi import APIRouter, Depends
from depends import get_db, Session, get_current_user, UserModel
from crud import PeopleCRUD, PeoplePublic, InsNumber
from pydantic import BaseModel, Field
router = APIRouter(prefix='/search', tags=['Search'])

class SearchPublic(BaseModel):
    ins_number: str = Field(..., title='СНИЛС', example='123-456-789 01')
    _ins_number_validator = InsNumber()
@router.post('/', summary='Поиск абитуриентов', response_model=list[PeoplePublic])
def search(search_data: SearchPublic,
           db: Session = Depends(get_db),
           user: UserModel = Depends(get_current_user)):
    resp = PeopleCRUD.get_by_ins_number(db, search_data.ins_number)
    return resp
