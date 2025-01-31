import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token && req.cookies) {
    token = req.cookies["token"];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }

  // @ts-ignore
  req.userId = decoded.userId;
  next();
};
