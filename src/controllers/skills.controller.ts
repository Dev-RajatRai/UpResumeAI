import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Skill from "../models/Skill.model";

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private
export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const { name, level, category, yearsOfExperience } = req.body;

  if (!name || !level || !category || !yearsOfExperience) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const skill = new Skill({
    name,
    level,
    category,
    yearsOfExperience,
    user: req.user?._id, // Assuming user is set via authentication middleware
  });

  const createdSkill = await skill.save();
  res.status(201).json(createdSkill);
});

// @desc    Get all skills for a user
// @route   GET /api/skills
// @access  Private
export const getSkills = asyncHandler(async (req: Request, res: Response) => {
  const skills = await Skill.find({ user: req.user?._id });
  res.status(200).json(skills);
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const { name, level, category, yearsOfExperience } = req.body;

  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    res.status(404).json({ message: "Skill not found" });
    return;
  }

  if (skill.user.toString() !== req.user?._id as string) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  skill.name = name || skill.name;
  skill.level = level || skill.level;
  skill.category = category || skill.category;
  skill.yearsOfExperience = yearsOfExperience || skill.yearsOfExperience;

  const updatedSkill = await skill.save();
  res.status(200).json(updatedSkill);
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    res.status(404).json({ message: "Skill not found" });
    return;
  }

  if (skill.user.toString() !== req.user?._id) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  // Use deleteOne instead of remove
  await Skill.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Skill removed" });
});
