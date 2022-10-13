
import jwt
import sqlalchemy.exc
from sqlalchemy.orm import Session
from ..models.user import UserModel
from datetime import timedelta
from time import time
from passlib.context import CryptContext
import config
from .models import *
from utils import log_response
class JWT:
    SECRET_KEY = config.JWT_SECRET_KEY
    ALGORITHM = 'HS256'
    @classmethod
    @log_response
    def encode(cls, data: dict):
        return jwt.encode(data.copy(), cls.SECRET_KEY, cls.ALGORITHM)

    @classmethod
    @log_response
    def decode(cls, token: str) -> dict:
        try:
            return jwt.decode(token, cls.SECRET_KEY, cls.ALGORITHM)
        except jwt.exceptions.DecodeError:
            raise ValueError('Invalid token')
        except jwt.exceptions.ExpiredSignatureError:
            raise ValueError('Token expired')

class UserCRUD:
    pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
    @classmethod
    def get_by_id(cls, db: Session, user_id: int) -> UserModel | None:
        return db.query(UserModel).filter(UserModel.id == user_id).first()

    @classmethod
    def get_by_username(cls, db: Session, username: str) -> UserModel | None:
        return db.query(UserModel).filter(UserModel.username == username).first()

    @classmethod
    def get_by_token(cls, db: Session, token: str) -> tuple[UserModel | None, bool]:
        try:
            data = JWT.decode(token)
        except ValueError:
            return None, False
        return cls.get_by_id(db, data.get('user_id') or -1), time() - data.get('exp', 0) < 0

    @classmethod
    def get_by_email(cls, db: Session, email: str) -> UserModel | None:
        return db.query(UserModel).filter(UserModel.email == email).first()

    @classmethod
    def get(cls,
            db: Session,
            *,
            user_id: int | None = None,
            username: str | None = None,
            token: str | None = None,
            email: str | None = None) -> UserModel | None:
        if user_id is not None:
            return cls.get_by_id(db, user_id)
        if username is not None:
            return cls.get_by_username(db, username)
        if token is not None:
            user, success = cls.get_by_token(db, token)
            return user if success else None
        if email is not None:
            return cls.get_by_email(db, email)
        return None

    @classmethod
    def all(cls, db: Session) -> list[UserModel]:
        return db.query(UserModel).all()

    @classmethod
    def create_access_token(cls,
                            user: UserModel,
                            expire: int | timedelta = config.ACCESS_TOKEN_EXPIRE_SECONDS) -> str:
        if isinstance(expire, timedelta):
            expire = expire.total_seconds()
        expire = int(time() + expire)
        return JWT.encode({'user_id': user.id, 'exp': expire})

    @classmethod
    def hash_password(cls, password: str) -> str:
        return cls.pwd_context.hash(password)

    @classmethod
    def verify_password(cls, password: str, hashed_password: str) -> bool:
        return cls.pwd_context.verify(password, hashed_password)

    @classmethod
    def authorize(cls, db: Session, email: str, password: str) -> str:
        user = cls.get_by_email(db, email)
        if user is None or not cls.verify_password(password, user.hashed_password):
            raise ValueError('Invalid username or password')
        return cls.create_access_token(user)
    @classmethod
    def register(cls,
                 db: Session,
                 email: str,
                 username: str,
                 password: str) -> UserModel:
        try:
            user = UserModel(
                username=username,
                hashed_password=cls.hash_password(password),
                email=email)
            db.add(user)
            db.commit()
            db.refresh(user)
            return user
        except sqlalchemy.exc.IntegrityError:
            raise ValueError('User with this email or username already exists')

