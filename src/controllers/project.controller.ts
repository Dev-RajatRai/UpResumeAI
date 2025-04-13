import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Project from "../models/Project.model";

// @desc    Add a new project
// @route   POST /api/projects
// @access  Private
export const addProject = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    technologies,
    liveUrl,
    githubUrl,
    startDate,
    endDate,
    isTeamProject,
    role,
    aiGenerated,
    aiSummary,
    keywordsUsed,
  } = req.body;

  const project = await Project.create({
    user: req.user?._id,
    title,
    description,
    technologies,
    liveUrl,
    githubUrl,
    startDate,
    endDate,
    isTeamProject,
    role,
    aiGenerated,
    aiSummary,
    keywordsUsed,
  });

  res.status(201).json(project);
});

// @desc    Get all projects of a user
// @route   GET /api/projects
// @access  Private
export const getUserProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await Project.find({ user: req.user?._id }).sort({
      startDate: -1,
    });
    res.json(projects);
  }
);

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    Object.assign(project, req.body);
    const updated = await project.save();

    res.json(updated);
  }
);

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user?._id,
    });

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.json({ message: "Project deleted successfully" });
  }
);
