import express from "express";
import {
  addExperience,
  getUserExperiences,
  updateExperience,
  deleteExperience,
} from "../controllers/workExperience.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").post(protect, addExperience).get(protect, getUserExperiences);
router
  .route("/:id")
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

export default router;
