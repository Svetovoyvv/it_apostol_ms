from ..models import StudyDirectionModel
from .models import *

from sqlalchemy.orm import Session

class StudyDirectionCRUD:
    @classmethod
    def get(cls, db: Session, study_id: int) -> StudyDirectionModel | None:
        return db.query(StudyDirectionModel).filter(StudyDirectionModel.id == study_id).first()
    @classmethod
    def all(cls, db: Session) -> list[StudyDirectionModel]:
        return db.query(StudyDirectionModel).all()