# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install django gunicorn
RUN pip install django whitenoise gunicorn  # include whitenoise

# Collect static files (optional, for completeness)
RUN python manage.py collectstatic --noinput

# Expose the port Gunicorn will use
EXPOSE 8000

# Start Gunicorn server
CMD ["gunicorn", "url_shortner.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
