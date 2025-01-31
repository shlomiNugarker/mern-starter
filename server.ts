import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.static("public"));

app.get("/**", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
