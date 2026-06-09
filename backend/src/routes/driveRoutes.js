import express from "express";
import {
  createDrive,
  getDrives,
  getDriveById,
  updateDrive,
  deleteDrive
} from "../controllers/driveController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin", "placement_officer"), createDrive);
router.get("/", protect, getDrives);
router.get("/:id", protect, getDriveById);
router.patch("/:id", protect, authorizeRoles("admin", "placement_officer"), updateDrive);
router.delete("/:id", protect, authorizeRoles("admin", "placement_officer"), deleteDrive);

export default router;