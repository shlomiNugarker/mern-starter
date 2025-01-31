import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken((user._id as string).toString());

    // ✅ שליחת הטוקן בעוגייה מאובטחת
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // רק ב-HTTPS בפרודקשן
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error in getUserProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
