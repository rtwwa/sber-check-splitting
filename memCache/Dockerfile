FROM python:3.13.3-alpine

WORKDIR /api

ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

COPY ./memCache/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./memCache .

EXPOSE 8000

CMD ["uvicorn", "api.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]