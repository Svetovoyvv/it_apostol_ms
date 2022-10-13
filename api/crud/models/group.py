from . import Base, q
from functools import cached_property
from utils import check_permission
class GroupModel(Base):
    __tablename__ = 'groups'
    id = q.Column(q.Integer, primary_key=True)
    name = q.Column(q.String(64), unique=True)
    display_name = q.Column(q.String(128), unique=False)
    permissions = q.Column(q.types.JSON, default=[])
    users = q.orm.relationship('UserModel', back_populates='group')

    @cached_property
    def crud(self):
        from .. import group
        return group.GroupCRUD

    def has_permission(self, permission: str) -> bool:
        state = None
        for i in self.permissions:
            if b := check_permission(i, permission) is not None:
                state = b
        return state
    