import requests
import json
from fastapi import status, HTTPException

def get_data(hash: str):
    ## Указываем путь к Redis
    url = f"http://memcache:8000/cache/get-data/cheque:{hash}"
    
    ## Получаем данные из Redis
    response = requests.get(url)
    
    ## Проверяем статус ответа
    if response.status_code != status.HTTP_200_OK:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="не удалось получить данные из Redis")
    
    return json.loads(response.json())
