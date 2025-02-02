"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const trainee_controller_1 = require("../controllers/trainee.controller");
const router = (0, express_1.Router)();
router.get("/my-trainees", auth_middleware_1.authMiddleware, trainee_controller_1.getMyTrainees);
router.put("/:traineeId", auth_middleware_1.authMiddleware, trainee_controller_1.updateTrainee);
router.delete("/:traineeId", auth_middleware_1.authMiddleware, trainee_controller_1.deleteTrainee);
exports.default = router;
