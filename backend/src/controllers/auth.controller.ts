import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken, verifyToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // @ts-ignore
    const token = generateToken(user._id.toString());
    const { password: _, ...safeUser } = user.toObject();

    res
      .status(200)
      .json({ message: "Login successful", token, user: safeUser });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerTrainee = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTrainee = new User({
      name,
      email,
      password: hashedPassword,
      role: "trainee",
    });

    await newTrainee.save();
    res
      .status(201)
      .json({ message: "Trainee registered successfully", user: newTrainee });
  } catch (error) {
    console.error("❌ Error in registerTrainee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerCoach = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCoach = new User({
      name,
      email,
      password: hashedPassword,
      role: "coach",
    });

    await newCoach.save();
    res
      .status(201)
      .json({ message: "Coach registered successfully", user: newCoach });
  } catch (error) {
    console.error("❌ Error in registerCoach:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Super Admin registration is not exposed to the frontend
export const registerSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "super_admin",
    });

    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Super Admin registered successfully", user: newAdmin });
  } catch (error) {
    console.error("❌ Error in registerSuperAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error(
      "❌ Error in forgotPassword:",
      JSON.stringify(error, null, 2)
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("❌ Error in resetPassword:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    let user = null;

    user = await User.findById((decoded as any).userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(
      "❌ Error in getAuthenticatedUser:",
      JSON.stringify(error, null, 2)
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
