import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri || "");
    console.log("✅ MongoDB connected successfully");
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
