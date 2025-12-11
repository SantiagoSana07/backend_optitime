import { Router } from "express";
import {
  getWeeklyReports,
  getWeeklyReportById,
  createWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport
} from "../controllers/weeklyReport.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getWeeklyReports);
router.get("/:id", verifyToken, getWeeklyReportById);
router.post("/", verifyToken, createWeeklyReport);
router.put("/:id", verifyToken, updateWeeklyReport);
router.delete("/:id", verifyToken, deleteWeeklyReport);

export default router;
