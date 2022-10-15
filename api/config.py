import os
JWT_SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret'
CORS_FRONTEND_URL = (os.environ.get('CORS_FRONTEND_URL') and os.environ.get('CORS_FRONTEND_URL').split()) or ['http://localhost:3000']
ACCESS_TOKEN_EXPIRE_SECONDS = int(os.environ.get('ACCESS_TOKEN_EXPIRE_SECONDS')) or 24 * 60 * 60
