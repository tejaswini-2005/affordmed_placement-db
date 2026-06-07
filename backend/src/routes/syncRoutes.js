import express from "express";
import { syncDataset } from "../controllers/syncController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/sync",
  protect,
  authorizeRoles("admin", "placement_officer"),
  syncDataset
);

export default router;