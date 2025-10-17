# ☁️ Weather-App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast and modern weather application built with a React/Vite frontend and a lightweight Express backend that securely handles API calls and uses Redis for high-performance caching.

## ✨ Features

- **Secure API Key Management:** Backend (Express) controls all external weather API requests, protecting the sensitive API key from exposure in the frontend.
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
| **HTTP Client**      | **Axios**                | Making requests to the Express backend |
| **Icons**            | **lucide-react**         | Lightweight, tree-shakeable SVG icons  |

### Backend

| Component          | Technology            | Role                                                    |
| :----------------- | :-------------------- | :------------------------------------------------------ |
| **Runtime/Server** | **Node.js / Express** | Lightweight, scalable API server                        |
| **API Requests**   | **Axios**             | Fetching data from the external weather API             |
| **Caching**        | **Redis**             | In-memory key-value store for caching weather data      |
| **Environment**    | **dotenv**            | Securely loading environment variables (API keys, etc.) |

---

## ⚙️ Prerequisites

1.  **Node.js**
2.  **npm**
3.  A running instance of **Redis Server**
4.  A **Free Weather API Key**

## ⬇️ Installation and Setup

### 1. Backend Environment Variables (`backend/.env`)

In the `backend` folder, create a file named **`.env`** and add your configuration:

```env
# Your port
PORT=5000

# Your external weather API key
WEATHER_API_KEY="YOUR_FREE_WEATHER_API_KEY"

# Redis Connection Details
REDIS_URL="redis://localhost:6379"
```
