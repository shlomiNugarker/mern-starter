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
exports.deleteTrainee = exports.updateTrainee = exports.getMyTrainees = void 0;
const User_1 = require("../models/User");
const getMyTrainees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        if (req.user.role !== "coach") {
            return res.status(403).json({ message: "Unauthorized" });
        }
        // @ts-ignore
        const trainees = yield User_1.User.find({ coachId: req.user._id }).select("-password");
        res.json(trainees);
    }
    catch (error) {
        console.error("❌ Error in getMyTrainees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getMyTrainees = getMyTrainees;
const updateTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { traineeId } = req.params;
        const { name, email, isActive } = req.body;
        // @ts-ignore
        if (req.user.role !== "coach") {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const trainee = yield User_1.User.findOne({
            _id: traineeId,
            // @ts-ignore
            coachId: req.user._id,
        });
        if (!trainee) {
            return res.status(404).json({ message: "Trainee not found" });
        }
        trainee.name = name || trainee.name;
        trainee.email = email || trainee.email;
        trainee.isActive = isActive !== null && isActive !== void 0 ? isActive : trainee.isActive;
        yield trainee.save();
        res.json({ message: "Trainee updated successfully", trainee });
    }
    catch (error) {
        console.error("❌ Error in updateTrainee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateTrainee = updateTrainee;
const deleteTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { traineeId } = req.params;
        // @ts-ignore
        if (req.user.role !== "coach") {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const trainee = yield User_1.User.findOne({
            _id: traineeId,
            // @ts-ignore
            coachId: req.user._id,
        });
        if (!trainee) {
            return res.status(404).json({ message: "Trainee not found" });
        }
        yield trainee.deleteOne();
        res.json({ message: "Trainee deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error in deleteTrainee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteTrainee = deleteTrainee;
