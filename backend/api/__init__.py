from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mongoengine
import os
from api.utils import responses
from api.utils.logs import console_logger

def dbinit():
    mongoengine.connect(db="CollabDB", host='localhost', username='root', password='example', authentication_source='admin')

def create_app():
    app = FastAPI(
        title="The Collab Circle",
        description="",
        version="1.0.0",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    dbinit()
    from api.users.routes import router as user_router
    from api.profiles.routes import router as profile_router
    from api.projects.routes import router as projects_router
    app.include_router(
        user_router, 
        tags = ["users"],
        prefix="/api/v1/user",
        responses={
            500: responses._500()
        }
    )
    app.include_router(
        profile_router,
        tags = ["profiles"], 
        prefix="/api/v1/profile",
        responses={
            500: responses._500()
        }
    )
    app.include_router(projects_router,tags = ["project"], prefix="/api/v1/projects")
    return app

app = create_app()