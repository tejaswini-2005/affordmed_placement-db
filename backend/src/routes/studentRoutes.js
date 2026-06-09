import express from "express";
import { getStudents, getStudentById } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getStudents);
router.get("/:id", protect, getStudentById);

export default router;