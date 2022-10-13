import fastapi
from fastapi.middleware.cors import CORSMiddleware
from config import CORS_FRONTEND_URL
app = fastapi.FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_FRONTEND_URL,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
router = fastapi.APIRouter(prefix='/api/v1')
from routes import user_router, search_router, universities_router
router.include_router(user_router)
router.include_router(search_router)
router.include_router(universities_router)
app.include_router(router)
from crud.models import Base
Base.metadata.create_all()

