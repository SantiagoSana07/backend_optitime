import { Router } from "express";
import {
  getWeeklyReports,
  getWeeklyReportById,
  createWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport
} from "../controllers/weeklyReport.controller.js";

const router = Router();

router.get("/", getWeeklyReports);
router.get("/:id", getWeeklyReportById);
router.post("/", createWeeklyReport);
router.put("/:id", updateWeeklyReport);
router.delete("/:id", deleteWeeklyReport);

export default router;
