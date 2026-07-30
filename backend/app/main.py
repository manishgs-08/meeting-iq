from fastapi import FastAPI

from app.api.routes import health, meetings


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="MeetingIQ",
        description="AI-powered meeting intelligence platform",
        version="0.1.0",
    )

    app.include_router(health.router)
    app.include_router(meetings.router)

    return app


app = create_app()
