import express from "express";

import {
  getPlacementAnalytics,
  getDepartmentAnalytics,
  getCompanyAnalytics
} from "../controllers/analyticsControllers.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/placements",
  protect,
  authorizeRoles("admin", "placement_officer"),
  getPlacementAnalytics
);

router.get(
  "/departments",
  protect,
  authorizeRoles("admin", "placement_officer"),
  getDepartmentAnalytics
);

router.get(
  "/companies",
  protect,
  authorizeRoles("admin", "placement_officer"),
  getCompanyAnalytics
);

export default router;