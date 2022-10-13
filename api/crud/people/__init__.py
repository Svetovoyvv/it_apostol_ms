from ..models.people import PeopleModel
from sqlalchemy.orm import Session
from .models import *
from sqlalchemy import or_
class PeopleCRUD:
    @classmethod
    def get_by_ins_number(cls, db: Session, ins_number: str) -> list[PeoplePublic] | None:
        return db.query(PeopleModel).filter(or_(
            PeopleModel.ins_number == ins_number,
            PeopleModel.ins_number == ins_number.replace(' ', '-'),
        )).all()
