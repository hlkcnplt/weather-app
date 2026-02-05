# ☁️ Weather-App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast and modern weather application built with a **React/Vite** frontend and a choice of three robust backends (**Node.js**, **.NET**, **Spring Boot**). It securely handles API calls and uses **Redis** for high-performance caching.

## ✨ Features

- **Multi-Backend Architecture:** Choose between Node.js, .NET, or Spring Boot for the backend service. All distinct implementations share the same API contract.
- **Dockerized:** Fully containerized with Docker Compose for easy one-step deployment.
- **Secure API Key Management:** Backend services control all external weather API requests, protecting the sensitive API key from exposure in the frontend.
- **High-Performance Caching:** Utilizes **Redis** as a powerful in-memory cache to store frequently requested weather data, dramatically reducing response times and minimizing calls to the external weather API.
- **Modern State Management:** Uses **Zustand** for simple, fast, and scalable application state management on the frontend.
- **Clean UI/UX:** Built with React and features intuitive, minimalist icons from **lucide-react**.

---

## 🚀 Tech Stack

### Frontend

| Component            | Technology               | Role                                   |
| :------------------- | :----------------------- | :------------------------------------- |
| **Framework**        | **React** (via **Vite**) | Component-based UI development         |
| **State Management** | **Zustand**              | Global state and API logic management  |
| **HTTP Client**      | **Axios**                | Making requests to the backend service |
| **Icons**            | **lucide-react**         | Lightweight, tree-shakeable SVG icons  |

### Backend Options (All included)

| Technology             | Port | Description                                         |
| :--------------------- | :--- | :-------------------------------------------------- |
| **Node.js / Express**  | 5001 | Lightweight, scalable JS-based API server (Default) |
| **Spring Boot (Java)** | 5002 | Robust, enterprise-grade Java backend               |
| **.NET (C#)**          | 5003 | High-performance, cross-platform .NET Web API       |

### Infrastructure

| Component            | Technology | Role                                                  |
| :------------------- | :--------- | :---------------------------------------------------- |
| **Containerization** | **Docker** | Orchestrates all services (Frontend, Backends, Redis) |
| **Caching**          | **Redis**  | In-memory key-value store for caching weather data    |

---

## ⚙️ Prerequisites

- **Docker Desktop** installed and running.
- A **Free Weather API Key** (e.g., from [WeatherAPI](https://www.weatherapi.com/) or similar provider used in the code).

---

## ⬇️ Installation and Setup

### 1. Configure Environment Variables

Create a **`.env`** file in the root directory of the project (same level as `docker-compose.yml`):

```env
# Your external weather API key (Required)
WEATHER_API_KEY="your_actual_api_key_here"

# Optional: Select which backend the frontend uses (Default is Node.js at port 5001)
# To use Spring Boot: http://localhost:5002/api/weather
# To use .NET: http://localhost:5003/api/weather
VITE_API_URL="http://localhost:5001/api/weather"
```

### 2. Run with Docker Compose

Build and start all services (Frontend, 3 Backends, Redis):

```bash
docker-compose up --build
```

Access the application at: **http://localhost:5173**

### 3. Verification

The application starts all backends simultaneously so you can test them individually if needed (e.g., via Postman or Curl):

- **Node.js API:** `http://localhost:5001/api/weather/:city`
- **Spring Boot API:** `http://localhost:5002/api/weather/:city`
- **.NET API:** `http://localhost:5003/api/weather/:city`

---

## 🛠️ Manual Setup (Without Docker)

If you prefer to run services individually without Docker, you will need to install the respective runtimes (Node.js, JDK, .NET SDK) and a local Redis instance.

1.  **Redis:** Start a local Redis server on port `6379`.
2.  **Backends:** Navigate to each folder (`backend-node`, `backend-spring`, `backend-dotnet`) and follow standard build/run procedures for that language. Ensure they point to your local Redis.
3.  **Frontend:** Navigate to `frontend`, install dependencies with `npm install`, configure `.env` to point to your chosen running backend, and start with `npm run dev`.
