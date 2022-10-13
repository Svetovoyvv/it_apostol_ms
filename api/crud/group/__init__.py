from sqlalchemy.orm import Session
from .models import GroupModel

class GroupCRUD:
    @classmethod
    def get_by_id(cls, db: Session, group_id: int) -> GroupModel | None:
        return db.query(GroupModel).filter(GroupModel.id == group_id).first()
    @classmethod
    def get_by_name(cls, db: Session, name: str) -> GroupModel | None:
        return db.query(GroupModel).filter(GroupModel.name == name).first()
    @classmethod
    def get(cls, db: Session, *, group_id: int | None = None, name: str | None = None) -> GroupModel | None:
        if group_id is not None:
            return cls.get_by_id(db, group_id)
        if name is not None:
            return cls.get_by_name(db, name)
