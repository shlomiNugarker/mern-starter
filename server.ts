import express, { Express } from "express";
import { json } from "body-parser";
import expressSession from "express-session";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const session = expressSession({
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production" },
});

app.use(session);
app.use(json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// ניהול שגיאות גלובלי
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`⚡️Server is running on port: ${PORT}`);
});
