import shutil
from fastapi import APIRouter, UploadFile
from api.routers.ocr_code import ocr_run
from api.CreateLink.create_link import create_link
from api.PostmanRedis import saveData

from random import randint

router = APIRouter(
    prefix="/images",
    tags=["Загрузка изображения чека"]
)

@router.post("/load-image")
def add_image(file: UploadFile):
    ## Генерируем уникальное имя файла
    nameID = randint(100000, 999999)
    
    ## Указываем путь к файлу
    im_path = f"api/static/images/{nameID}.webp"
    
    ## Сохраняем файл в папку static/images
    with open(im_path, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    ## Выполняем OCR
    ocr_result = ocr_run(im_path)
    
    ## Создаем уникальную ссылку
    UrlAndHash = create_link()
    
    ## Сохраняем данные в Redis
    saveData.save_data(ocr_result, UrlAndHash[1])
    
    return {
        "status": "success",
        "url": UrlAndHash[0],
        "hash": UrlAndHash[1],
        "message": "Изображение успешно загружено и обработано.",
        "cheque":  ocr_result
    }
