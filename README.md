# MERN Starter

## 🚀 Introduction

This project is a full-stack MERN (MongoDB, Express, React, Node.js) starter template, built with **TypeScript** and **Vite** for fast development.

## 📂 Project Structure

### **Backend (Express + TypeScript)**

Located in the `/backend` directory, the server is built with **Express.js** and connected to **MongoDB** using **Mongoose**.

- **Main entry point:** `server.ts`
- **User authentication with JWT** (`auth.middleware.js`)
- **User management API** (`user.controller.js`)
- **Database connection** (`db.js`)
- **Session management with `express-session`**
- **Environment configuration via `.env`**

### **Frontend (React + Vite + TypeScript)**

Located in the `/frontend` directory, the client-side app is built with **React** and **Vite**, using **Tailwind CSS**.

- **Main entry point:** `main.tsx`
- **App Component:** `App.tsx`
- **State management:** TBD (if Redux/Context is used)
- **Routing:** TBD (if React Router is used)
- **I18n support:** `i18n.ts`
- **Styling:** `tailwind.config.js`

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-repo/mern-starter.git
cd mern-starter
```

### **2️⃣ Install Dependencies**

#### **Backend**

```sh
cd backend
npm install
```

#### **Frontend**

```sh
cd frontend
npm install
```

### **3️⃣ Setup Environment Variables**

Create a `.env` file inside `/backend` and define:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

### **4️⃣ Start the Development Server**

#### **Backend**

```sh
cd backend
npm run dev
```

#### **Frontend**

```sh
cd frontend
npm run dev
```

## 📡 API Routes

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/login`    | Login user                   |
| POST   | `/api/auth/register` | Register new user            |
| GET    | `/api/users/profile` | Get user profile (protected) |

## 🚀 Features

- 🔒 **JWT Authentication**
- 🎨 **TailwindCSS for UI**
- ⚡ **Vite for fast builds**
- 🌍 **i18n support**
- 🔄 **Session-based authentication**
- 📡 **REST API with Express.js**

## 🤝 Contributing

PRs are welcome! Follow best practices and submit a PR for review.

## 🛠 Technologies Used

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** Node.js, Express.js, Mongoose, JWT
- **Database:** MongoDB
- **Tools:** ESLint, Prettier, Nodemon

## 📜 License

MIT License. Feel free to use and modify this project!

---

🚀 Built with ❤️ by Shlomi
