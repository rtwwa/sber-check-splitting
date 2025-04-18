from fastapi import APIRouter
from api.Postman.get_data import get_data

router = APIRouter(
    prefix="/small-router",
    tags=["Умный роутер"]
)

@router.get("/{hash}")
def routing(hash: str):
    ## Получаем данные из Redis
    client_data = get_data(hash)

    return {
        "hash": hash,
        "client": client_data
    }