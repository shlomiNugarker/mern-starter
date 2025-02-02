import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getMyTrainees,
  updateTrainee,
  deleteTrainee,
} from "../controllers/trainee.controller";

const router = Router();

router.get("/my-trainees", authMiddleware, getMyTrainees);

router.put("/:traineeId", authMiddleware, updateTrainee);

router.delete("/:traineeId", authMiddleware, deleteTrainee);

export default router;
