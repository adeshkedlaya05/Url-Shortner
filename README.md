# URL Shortener 

A simple URL shortener web application built with Django that allows users to shorten URLs and set a custom expiry time after which the shortened URL will no longer work.

---

## Features

- Shorten any valid URL to a short, unique code.
- Users can set expiry time (hours, minutes, seconds) for each shortened URL.
- Redirect users to the original URL if the short URL is still valid.
- Show a "not found" page if the URL has expired or does not exist.
- **Implemented SOLID design principles** for clean, maintainable, and scalable code.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Django Templates)
- **Backend:** Django, Gunicorn, WhiteNoise (for static files)
- **Database:** SQLite (default with Django)
- **Containerization:** Docker
- **Cloud & Infrastructure:** AWS EC2, Terraform

---

## Getting Started

### Prerequisites

- Docker
- AWS account (optional, for deployment)
- Terraform (optional, for infrastructure automation)
- DockerHub Account

### DockerHub Repository
https://hub.docker.com/repository/docker/adeshkedlaya2003/url/general

---

### Output 
![Screenshot 2025-05-25 175616](https://github.com/user-attachments/assets/ef4dd749-07ed-4e4c-9215-5feea870451c)

---

### Clone the repository
```bash
git clone https://github.com/adeshkedlaya05/Url-Shortner.git
```





