import { Router } from "express";
import {
  addTrainee,
  getMyTrainees,
  updateTrainee,
  deleteTrainee,
} from "../controllers/trainee.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/add", authMiddleware, addTrainee);

router.get("/my-trainees", authMiddleware, getMyTrainees);

router.put("/:traineeId", authMiddleware, updateTrainee);

router.delete("/:traineeId", authMiddleware, deleteTrainee);

export default router;
