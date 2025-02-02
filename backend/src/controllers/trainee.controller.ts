import { Request, Response } from "express";
import { User } from "../models/User";

export const getMyTrainees = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (req.user.role !== "coach") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    // @ts-ignore
    const trainees = await User.find({ coachId: req.user._id }).select(
      "-password"
    );
    res.json(trainees);
  } catch (error) {
    console.error("❌ Error in getMyTrainees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTrainee = async (req: Request, res: Response) => {
  try {
    const { traineeId } = req.params;
    const { name, email, isActive } = req.body;

    // @ts-ignore
    if (req.user.role !== "coach") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const trainee = await User.findOne({
      _id: traineeId,
      // @ts-ignore
      coachId: req.user._id,
    });
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    trainee.name = name || trainee.name;
    trainee.email = email || trainee.email;
    trainee.isActive = isActive ?? trainee.isActive;

    await trainee.save();
    res.json({ message: "Trainee updated successfully", trainee });
  } catch (error) {
    console.error("❌ Error in updateTrainee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTrainee = async (req: Request, res: Response) => {
  try {
    const { traineeId } = req.params;

    // @ts-ignore
    if (req.user.role !== "coach") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const trainee = await User.findOne({
      _id: traineeId,
      // @ts-ignore
      coachId: req.user._id,
    });
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    await trainee.deleteOne();
    res.json({ message: "Trainee deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteTrainee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
