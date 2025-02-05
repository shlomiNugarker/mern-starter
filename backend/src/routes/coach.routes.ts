import { Router } from "express";
import {
  addCoach,
  getCoaches,
  updateCoach,
  deleteCoach,
} from "../controllers/coach.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/all", authMiddleware, getCoaches);
router.post("/add", authMiddleware, addCoach);
router.put("/:coachId", authMiddleware, updateCoach);
router.delete("/:coachId", authMiddleware, deleteCoach);

export default router;
