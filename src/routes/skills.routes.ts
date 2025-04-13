import express from "express";
import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/skills.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router
  .route("/")
  .post(protect, createSkill) // Create a new skill
  .get(protect, getSkills); // Get all skills

router
  .route("/:id")
  .put(protect, updateSkill) // Update a skill by ID
  .delete(protect, deleteSkill); // Delete a skill by ID

export default router;
