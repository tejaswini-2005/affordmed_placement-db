import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from "../controllers/companyController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin", "placement_officer"), createCompany);
router.get("/", protect, getCompanies);
router.get("/:id", protect, getCompanyById);
router.patch("/:id", protect, authorizeRoles("admin", "placement_officer"), updateCompany);
router.delete("/:id", protect, authorizeRoles("admin", "placement_officer"), deleteCompany);

export default router;