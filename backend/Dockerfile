# backend/Dockerfile

FROM python:3.9

WORKDIR /app

COPY . /app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8001

ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "python manage.py migrate && python manage.py createadmin && python manage.py runserver 0.0.0.0:8001"]
