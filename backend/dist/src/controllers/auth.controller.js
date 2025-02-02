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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = exports.resetPassword = exports.forgotPassword = exports.logoutUser = exports.registerSuperAdmin = exports.registerCoach = exports.registerTrainee = exports.loginUser = void 0;
const User_1 = require("../models/User");
const jwt_1 = require("../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // @ts-ignore
        const token = (0, jwt_1.generateToken)(user._id.toString());
        const _a = user.toObject(), { password: _ } = _a, safeUser = __rest(_a, ["password"]);
        res
            .status(200)
            .json({ message: "Login successful", token, user: safeUser });
    }
    catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = loginUser;
const registerTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newTrainee = new User_1.User({
            name,
            email,
            password: hashedPassword,
            role: "trainee",
        });
        yield newTrainee.save();
        res
            .status(201)
            .json({ message: "Trainee registered successfully", user: newTrainee });
    }
    catch (error) {
        console.error("❌ Error in registerTrainee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerTrainee = registerTrainee;
const registerCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newCoach = new User_1.User({
            name,
            email,
            password: hashedPassword,
            role: "coach",
        });
        yield newCoach.save();
        res
            .status(201)
            .json({ message: "Coach registered successfully", user: newCoach });
    }
    catch (error) {
        console.error("❌ Error in registerCoach:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerCoach = registerCoach;
// Super Admin registration is not exposed to the frontend
const registerSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newAdmin = new User_1.User({
            name,
            email,
            password: hashedPassword,
            role: "super_admin",
        });
        yield newAdmin.save();
        res
            .status(201)
            .json({ message: "Super Admin registered successfully", user: newAdmin });
    }
    catch (error) {
        console.error("❌ Error in registerSuperAdmin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerSuperAdmin = registerSuperAdmin;
const logoutUser = (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).json({ message: "Logout successful" });
};
exports.logoutUser = logoutUser;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
        yield user.save();
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        yield transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}`,
        });
        res.status(200).json({ message: "Reset link sent to your email" });
    }
    catch (error) {
        console.error("❌ Error in forgotPassword:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = yield User_1.User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        user.password = yield bcrypt_1.default.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        yield user.save();
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    catch (error) {
        console.error("❌ Error in resetPassword:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.resetPassword = resetPassword;
const getAuthenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }
        let user = null;
        user = yield User_1.User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("❌ Error in getAuthenticatedUser:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
