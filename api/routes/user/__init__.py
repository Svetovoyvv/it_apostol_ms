import fastapi

router = fastapi.APIRouter(prefix='/user', tags=['User'])


from . import login
from . import profile
from . import register
