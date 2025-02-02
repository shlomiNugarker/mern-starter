"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.findAllUsers)();
        res.json(users);
    }
    catch (error) {
        console.error("❌ Error in getAllUsers:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
});
exports.getAllUsers = getAllUsers;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!["trainee", "coach", "super_admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        const updatedUser = yield (0, user_service_1.updateUserById)(id, { role });
        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User role updated successfully", user: updatedUser });
    }
    catch (error) {
        console.error("❌ Error in updateUserRole:", error);
        res.status(500).json({ message: "Failed to update role" });
    }
});
exports.updateUserRole = updateUserRole;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, user_service_1.deleteUserById)(id);
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error in deleteUser:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
