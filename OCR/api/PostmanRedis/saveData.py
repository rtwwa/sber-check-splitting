import requests
from typing import Any
from fastapi import status, HTTPException

def save_data(model: dict[str, Any], hash: str) -> str:
    ## Указываем путь к микросервису Redis
    url = f"http://memcache:8000/cache/set-data/cheque:{hash}"
    
    ## Отправляем данные в микросервис Redis
    resonse = requests.post(url, json=model)
    
    ## Проверяем статус ответа
    if resonse.status_code != status.HTTP_200_OK:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="не удалось сохранить данные в Redis")
    
    return "Данные отправлены в микросервис Redis успешно!"