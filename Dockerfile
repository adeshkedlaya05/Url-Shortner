# Stage 1: Build React frontend
FROM node:18-alpine as frontend-build

WORKDIR /frontend

# Install React dependencies and build
COPY url_shortner/frontend/package*.json ./
RUN npm install
COPY url_shortner/frontend/ ./
RUN npm run build

# Stage 2: Django backend with static build
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc python3-dev libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy Django project
COPY url_shortner/ /app/

# Copy frontend build from previous stage
COPY --from=frontend-build /frontend/build /app/frontend_build

# Install Python dependencies
RUN pip install --no-cache-dir \
    Django psycopg2-binary gunicorn \
    python-dotenv python-decouple \
    whitenoise django-cors-headers


COPY .env /app/.env
# Expose Django app port
EXPOSE 8000

# Collect static files + start Gunicorn
CMD ["gunicorn", "url_shortner.wsgi:application", "--bind", "0.0.0.0:8000"]
