import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers.client_page import router as small_router

## Создаем экземпляр FastAPI
app = FastAPI()

## Подключаем роутеры
app.include_router(small_router)

## Подключаем CORS
origins = [
    "http://localhost:5173",
]

## Настраиваем CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", 
                   "Access-Control-Allow-Origin", "Authorization"],
)

## Запускаем приложение
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8090)