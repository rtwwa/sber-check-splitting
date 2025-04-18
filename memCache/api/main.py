import uvicorn
from fastapi import FastAPI
from api.memCache.router import router as storage_router 

## Создаём FastAPI экземпляр
app = FastAPI()

## Подключаем роутеры
app.include_router(storage_router)

## Запускаем приложение
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)