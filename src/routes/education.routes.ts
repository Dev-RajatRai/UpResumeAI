import express from "express";
import {
  addEducation,
  getUserEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").post(protect, addEducation).get(protect, getUserEducation);
router
  .route("/:id")
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

export default router;
