# 🏋️ WorkoutBuddy – Your Ultimate Fitness Companion

[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-v0.95.0-green)](https://fastapi.tiangolo.com/)
[![Django](https://img.shields.io/badge/Django-5.2.4-green)](https://www.djangoproject.com/)
[![Demo](https://img.shields.io/badge/Live-Demo-blueviolet)](https://workoutbuddy-frontend-r4f7.onrender.com)


---

## 📌 Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Quick Start](#quick-start)
* [API Documentation](#api-documentation)
* [Live Demo](#live-demo)
* [Project Structure](#project-structure)
* [Environment Configuration](#environment-configuration)
* [Testing](#testing)
* [Docker Support](#docker-support)
* [Contributing](#contributing)
* [License](#license)
* [Support](#support)
* [Acknowledgments](#acknowledgments)
* [Roadmap](#roadmap)

---

## 🎯 Overview

**WorkoutBuddy** is a complete fitness ecosystem:

* **Backend:** FastAPI REST API with AI integration
* **Frontend:** Django-based web interface
* **AI Assistance:** Smart workout & diet recommendations
* **Progress Tracking:** Visual analytics and performance metrics

---

## 🚀 Key Features

### 🏋️ Workout Management

* Personalized workout routines
* Track performance & progress
* Workout analytics and charts
* Comprehensive exercise library

### 🥗 Diet Planning

* Custom diet plans based on goals
* Daily meal logging & nutritional tracking
* AI-powered meal suggestions
* Visual diet progress charts

### 🤖 AI-Powered Assistance

* Smart recommendations based on progress
* 24/7 fitness chatbot
* Intelligent analysis of fitness data
* Personalized workout & diet plans

### 📊 Progress Analytics

* Visual charts for workouts and diet
* Historical performance tracking
* Goal & milestone monitoring
* Comprehensive dashboard

### 🔐 User Management

* Secure JWT authentication
* OAuth login (Google, GitHub)
* Profile management & password reset

---

## 🛠️ Tech Stack

**Backend:**

* FastAPI
* MongoDB
* JWT & OAuth2 Authentication
* Google Gemini & Groq AI Services
* SMTP Email Integration
* pytest for testing

**Frontend:**

* Django 5.2.4
* SQLite (development)
* HTML5, CSS3, JavaScript
* WhiteNoise for static files

---

## 📋 Prerequisites

**Backend:**

* Python 3.8+
* MongoDB 4.4+
* Redis
* Google/GitHub OAuth credentials
* Gemini API key

**Frontend:**

* Python 3.8+
* Django 5.2.4+
* Node.js (for static files)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/workoutbuddy.git
cd workoutbuddy
```

### 2️⃣ Backend Setup

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3️⃣ Frontend Setup

```bash
cd Frontend/workoutBuddy
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8001
```

---

## 📖 API Documentation

* **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
* **OpenAPI Schema:** [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)

---

## 🌐 Live Demo

* **Frontend:** [WorkoutBuddy Frontend](https://workoutbuddy-frontend-r4f7.onrender.com)
* **Backend API:** [WorkoutBuddy API](https://workout-buddy-fjrx.onrender.com)

---

## 📁 Project Structure

```
workoutbuddy/
├── Backend/                 
│   ├── app/
│   │   ├── main.py            
│   │   ├── api/              
│   │   ├── models/           
│   │   ├── schemas/          
│   │   ├── utils/            
│   │   └── tests/            
│   ├── requirements.txt      
│   └── README.md             
├── Frontend/                 
│   └── workoutBuddy/
│       ├── manage.py         
│       ├── workoutBuddy/     
│       ├── user/             
│       ├── dietPlan/         
│       ├── workout/          
│       ├── trackProgress/    
│       ├── static/           
│       └── templates/        
└── README.md                 
```

---

## 🔧 Environment Configuration

**Backend (.env)**

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=workoutbuddy
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET_KEY=your-session-secret
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USERNAME=your-username
MAILTRAP_PASSWORD=your-password
FROM_EMAIL=noreply@workoutbuddy.com
GROQ_API_KEY=your-groq-api-key
```

**Frontend (.env)**

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
FASTAPI_BASE_URL=http://localhost:8000
```

---

## 🧪 Testing

**Backend**

```bash
cd Backend
pytest app/tests/ -v
```

**Frontend**

```bash
cd Frontend/workoutBuddy
python manage.py test
```
---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 🙏 Acknowledgments

* FastAPI & Django teams
* Google for Gemini AI integration
* MongoDB for the flexible database
* All contributors & testers

---

## 🗺️ Roadmap

* [ ] Mobile app (React Native)
* [ ] Wearable device integration
* [ ] Advanced AI coaching features
* [ ] Social & community challenges
* [ ] Expanded nutrition database
* [ ] Multi-language support
# WorkoutBuddy

