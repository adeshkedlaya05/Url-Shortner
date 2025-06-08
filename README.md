# URL Shortner 

A fullstack URL shortener web application built with React and Django that allows users to shorten URLs and set a custom expiry time (in hours, minutes, and seconds), after which the shortened URL becomes inactive. The project uses Django REST Framework for the backend API, React for the interactive frontend, and supports production-ready deployment using Docker, Gunicorn, WhiteNoise, and AWS.

---

## Features

- Shorten any valid URL to a short, unique code.
- Users can set expiry time (hours, minutes, seconds) for each shortened URL.
- Redirect users to the original URL if the short URL is still valid.
- Show a **not found page** if the URL has expired or does not exist.
- **Implemented SOLID design principles** for clean, maintainable, and scalable code.

---

## Tech Stack

- **Frontend:** React.js (functional components with Hooks), React Router DOM for routing, CSS Modules for styling, JavaScript (ES6+)
- **Backend:** Django, Gunicorn, WhiteNoise (for serving static files)
- **Database:** SQLite 
- **Containerization:** Docker
- **Cloud & Infrastructure:** AWS, Terraform

---

### Architecture diagram
<p align="center">
  <img src="https://github.com/user-attachments/assets/518f337e-69d9-4873-9c55-52a6a854c42d"
 alt="Architecture Diagram" width="600"/>
</p>

---

### AWS Architecture diagram
<p align="center">
  <img src="https://github.com/user-attachments/assets/5661832f-a8d4-4309-a929-bf10c73da2ff"
 alt="Architecture Diagram" width="600"/>
</p>

---

### Output 
![Screenshot 2025-05-25 175616](https://github.com/user-attachments/assets/ef4dd749-07ed-4e4c-9215-5feea870451c)

---

### DockerHub Repository
https://hub.docker.com/r/adeshkedlaya2003/url

---

### Clone the repository
```bash
git clone https://github.com/adeshkedlaya05/Url-Shortner.git
```





