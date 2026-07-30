from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check() -> dict:
    """Return the health status of the API."""
    return {"status": "healthy"}
