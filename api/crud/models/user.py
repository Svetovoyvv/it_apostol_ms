from . import Base, q
from pydantic import BaseModel
from functools import cached_property
from datetime import datetime
from .group import GroupModel
from utils import check_permission
class UserModel(Base):
    __tablename__ = 'users'
    id: int = q.Column(q.Integer, primary_key=True)
    username: str = q.Column(q.String(64), unique=True)
    email: str = q.Column(q.String(128), unique=True)
    permissions: list[str] = q.Column(q.types.JSON, default=[])
    is_active: bool = q.Column(q.Boolean, default=True)
    group_id: int = q.Column(q.Integer, q.ForeignKey('groups.id'))
    group: GroupModel = q.orm.relationship('GroupModel', back_populates='users')
    hashed_password: str = q.Column(q.String(256))
    created_at: datetime = q.Column(q.DateTime, default=q.func.now())
    @cached_property
    def crud(self):
        from .. import user
        return user.UserCRUD

    def has_permission(self, permission: str) -> bool:
        state = None
        if self.group is not None:
            state = self.group.has_permission(permission)
        for i in self.permissions:
            if b := check_permission(i, permission) is not None:
                state = b
        return state




