# 🚀 mern-starter Project - Full Stack Web Application

## 📌 Overview

mern-starter Project is a **full-stack web application** built using **React (Vite) for the frontend** and **Node.js (Express, TypeScript) with MongoDB for the backend**. The project includes authentication, user management, and a clean UI based on Tailwind CSS and ShadCN UI components.

---

## 🏗️ Tech Stack

### **Frontend** (React + Vite)

- **React** (with TypeScript)
- **Vite** (for fast development)
- **React Router** (for navigation)
- **Tailwind CSS** (for styling)
- **ShadCN UI** (for pre-styled UI components)
- **i18next** (for multilingual support)
- **Lucide Icons** (for modern icons)

### **Backend** (Node.js + Express)

- **Express.js** (REST API framework)
- **TypeScript** (strongly typed backend)
- **MongoDB (Mongoose ORM)** (for database management)
- **JWT (jsonwebtoken)** (for authentication security)
- **bcrypt** (for password hashing)
- **Nodemailer** (for email services)

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git https://github.com/shlomiNugarker/mern-starter.git
cd mern-starter
```

### **2️⃣ Backend Setup**

```sh
cd backend
npm install
```

- Create a `.env` file in `backend/` with the following:
  ```env
  PORT=3030
  MONGO_URI=your-mongodb-uri
  SESSION_SECRET=your-session-secret
  NODE_ENV=development
  FRONTEND_URL=http://localhost:5173/
  ```
- Start the backend server:
  ```sh
  npm run dev
  ```

### **3️⃣ Frontend Setup**

```sh
cd ../frontend
npm install
npm run dev
```

> The frontend will start at **http://localhost:5173** by default.

---

## 🛠️ Features

### ✅ **Authentication System**

- User registration & login
- JWT-based authentication
- Password hashing with `bcrypt`

### ✅ **User Management**

- Fetch logged-in user details
- Role-based access control (`admin` & `user`)

### ✅ **Modern UI**

- Responsive design with **Tailwind CSS**
- Ready-made UI components via **ShadCN UI**
- Dark mode support (if applicable)

### ✅ **Multilingual Support**

- i18next setup for dynamic language switching
- Predefined translations for **English & Hebrew**

### ✅ **Email Services**

- Password reset via email (Nodemailer)

---

## 🔗 API Endpoints

### **🔐 Authentication Routes** (`/api/auth`)

| Method | Route                    | Description                    |
| ------ | ------------------------ | ------------------------------ |
| POST   | `/register`              | Register a new user            |
| POST   | `/login`                 | User login                     |
| POST   | `/logout`                | Logout user                    |
| POST   | `/forgot-password`       | Send password reset email      |
| POST   | `/reset-password/:token` | Reset password                 |
| GET    | `/me`                    | Get authenticated user details |

### **👤 User Routes** (`/api/users`)

| Method | Route  | Description      |
| ------ | ------ | ---------------- |
| GET    | `/`    | Fetch all users  |
| GET    | `/:id` | Fetch user by ID |

---

## 📂 Project Structure

```
raz_proj/
│── backend/        # Express.js API (Node.js + TypeScript)
│   ├── src/
│   │   ├── controllers/    # API logic (auth, users)
│   │   ├── models/         # MongoDB Mongoose models
│   │   ├── routes/         # Express API routes
│   │   ├── middlewares/    # Auth & Admin protection
│   │   ├── database/       # DB connection setup
│   │   ├── utils/          # Helper functions (JWT, bcrypt)
│   ├── server.ts           # Main entry point
│   ├── package.json        # Backend dependencies
│
│── frontend/       # React + Vite Frontend
│   ├── src/
│   │   ├── pages/            # Login, Register, Home
│   │   ├── components/       # Reusable UI components
│   │   ├── assets/           # Images & icons
│   │   ├── i18n.ts           # Language configuration
│   ├── package.json         # Frontend dependencies
│
│── README.md       # Documentation
│── .gitignore      # Git ignored files
```

## 💡 Contributing

1. **Fork** the repository.
2. Create a **new branch** for your feature.
3. **Commit** your changes.
4. Open a **pull request**.

---

## 📜 License

This project is open-source and available under the **MIT License**.
