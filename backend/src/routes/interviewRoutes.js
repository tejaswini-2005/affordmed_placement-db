import express from "express";
import {
  scheduleInterview,
  updateInterviewResult
} from "../controllers/interviewController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "placement_officer"),
  scheduleInterview
);

router.patch(
  "/:id",
  protect,
  authorizeRoles("admin", "placement_officer"),
  updateInterviewResult
);

export default router;