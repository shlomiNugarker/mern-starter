import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import {
  getProfile,
  updateProfile,
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../controllers/user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

router.patch("/profile", authMiddleware, updateProfile);

router.delete("/profile", authMiddleware, deleteUser);

router.get("/all", authMiddleware, adminMiddleware, getAllUsers);

router.patch("/role/:id", authMiddleware, adminMiddleware, updateUserRole);

export default router;
