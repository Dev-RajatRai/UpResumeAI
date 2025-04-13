import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import WorkExperience from "../models/WorkExperience.model";

// @desc    Add new work experience
// @route   POST /api/experience
// @access  Private
export const addExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      jobTitle,
      companyName,  
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      aiGenerated,
      keywordsUsed,
    } = req.body;

    const experience = await WorkExperience.create({
      user: req.user?._id,
      jobTitle,
      companyName,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      aiGenerated,
      keywordsUsed,
    });

    res.status(201).json(experience);
  }
);

// @desc    Get all experiences for a user
// @route   GET /api/experience
// @access  Private
export const getUserExperiences = asyncHandler(
  async (req: Request, res: Response) => {
    const experiences = await WorkExperience.find({ user: req.user?._id }).sort({
      startDate: -1,
    });
    res.json(experiences);
  }
);

// @desc    Update a work experience
// @route   PUT /api/experience/:id
// @access  Private
export const updateExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await WorkExperience.findOne({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!experience) {
      res.status(404);
      throw new Error("Experience not found");
    }

    Object.assign(experience, req.body);
    const updated = await experience.save();

    res.json(updated);
  }
);

// @desc    Delete a work experience
// @route   DELETE /api/experience/:id
// @access  Private
export const deleteExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await WorkExperience.findOneAndDelete({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!experience) {
      res.status(404);
      throw new Error("Experience not found or already deleted");
    }

    res.json({ message: "Experience deleted successfully" });
  }
);
