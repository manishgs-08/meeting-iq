from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.api.routes import health, meetings


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="MeetingIQ",
        description="AI-powered meeting intelligence platform",
        version="0.1.0",
    )

    allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
    allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",")]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    app.include_router(meetings.router)

    return app


app = create_app()
