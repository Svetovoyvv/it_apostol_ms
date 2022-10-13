import sqlalchemy as q
from sqlalchemy.ext.declarative import declarative_base
import time
import os
from loguru import logger
db_url = os.environ.get('DB_CONNECTION_URI') or 'sqlite:///crud.db'
connect_args = {}
if db_url.startswith('sqlite'):
    connect_args['check_same_thread'] = False
while True:
    try:
        engine = q.create_engine(db_url, connect_args=connect_args)
        engine.connect()
        break
    except Exception: # noqa
        logger.info('Waiting for database')
        time.sleep(1)
logger.info('Connected to database')
SessionLocal = q.orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base(bind=engine)

from .user import *
from .group import *
from .university import *
from .studydirection import *
from .people import *


