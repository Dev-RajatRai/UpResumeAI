import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Education from "../models/Education.model";

// @desc    Add new education entry
// @route   POST /api/education
// @access  Private
export const addEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
      grade,
      description,
      aiGenerated,
      keywordsUsed,
      aiSummary,
    } = req.body;

    const education = await Education.create({
      user: req.user?._id,
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
      grade,
      description,
      aiGenerated,
      keywordsUsed,
      aiSummary,
    });

    res.status(201).json(education);
  }
);

// @desc    Get all education entries of a user
// @route   GET /api/education
// @access  Private
export const getUserEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await Education.find({ user: req.user?._id }).sort({
      startDate: -1,
    });
    res.json(education);
  }
);

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private
export const updateEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await Education.findOne({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!education) {
      res.status(404);
      throw new Error("Education entry not found");
    }

    Object.assign(education, req.body);
    const updated = await education.save();

    res.json(updated);
  }
);

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private
export const deleteEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const education = await Education.findOneAndDelete({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!education) {
      res.status(404);
      throw new Error("Education entry not found");
    }

    res.json({ message: "Education entry deleted successfully" });
  }
);
