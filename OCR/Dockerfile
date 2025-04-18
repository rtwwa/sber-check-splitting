FROM python:3.13.3-alpine

WORKDIR /api

ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
RUN pip install pillow pytesseract
RUN apk update && apk add --no-cache \
    tesseract-ocr \
    tesseract-ocr-data-eng \
    tesseract-ocr-data-rus 

COPY ./OCR/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./OCR .

EXPOSE 8080

CMD ["uvicorn", "api.main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]