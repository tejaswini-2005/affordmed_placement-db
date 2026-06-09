import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
} from "../controllers/applicationController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createApplication);
router.get("/", protect, getApplications);
router.get("/:id", protect, getApplicationById);
router.patch("/:id", protect, authorizeRoles("admin", "placement_officer"), updateApplication);
router.delete("/:id", protect, authorizeRoles("admin", "placement_officer"), deleteApplication);

export default router;