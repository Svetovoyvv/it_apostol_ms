from ..models import UniversityModel, StudyDirectionModel, PeopleModel
from .models import *
from sqlalchemy.orm import Session
import sqlalchemy as q


class UniversityCRUD:
    GET_DIRECTIONS_CACHE: dict[int, list[int]] = {}

    @classmethod
    def get(cls, db: Session, university_id: int) -> UniversityModel | None:
        return db.query(UniversityModel).filter(UniversityModel.id == university_id).first()

    @classmethod
    def all(cls, db: Session) -> list[UniversityModel]:
        return db.query(UniversityModel).all()

    @classmethod
    def get_directions(cls, db: Session, university_id: int) -> list[int]:
        if cls.GET_DIRECTIONS_CACHE.get(university_id) is None:
            ids = list({i.study_id for i in
                        db.query(PeopleModel).filter(PeopleModel.university_id == university_id).all()
                        })
            cls.GET_DIRECTIONS_CACHE[university_id] = ids
        return cls.GET_DIRECTIONS_CACHE[university_id]
