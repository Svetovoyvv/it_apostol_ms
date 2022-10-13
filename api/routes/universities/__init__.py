from fastapi import APIRouter
from crud import UniversityCRUD, StudyDirectionCRUD, UniversityInfo
from depends import Depends, get_db, Session
router = APIRouter(prefix='/universities', tags=['Universities'])

@router.get('/', response_model=list[UniversityInfo], summary='Получить список вузов')
def get_all_universities(db: Session = Depends(get_db)):
    universities = UniversityCRUD.all(db)
    for u in universities:
        u.study_directions = [
            StudyDirectionCRUD.get(db, i) for i in UniversityCRUD.get_directions(db, u.id)
        ]

    return universities
