import mongoose from "mongoose";
import { config } from "../config";

console.log(config.mongoUri);

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri || "");
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
