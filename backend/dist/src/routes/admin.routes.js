"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
router.get("/users", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["super_admin"]), admin_controller_1.getAllUsers);
router.put("/users/:id/role", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["super_admin"]), admin_controller_1.updateUserRole);
router.delete("/users/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["super_admin"]), admin_controller_1.deleteUser);
exports.default = router;
