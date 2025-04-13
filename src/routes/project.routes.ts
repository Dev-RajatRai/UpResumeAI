import express from "express";
import {
  addProject,
  getUserProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").post(protect, addProject).get(protect, getUserProjects);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);

export default router;
