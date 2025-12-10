import { Router } from "express";
import {
  getDailyJournals,
  getDailyJournalById,
  createDailyJournal,
  updateDailyJournal,
  deleteDailyJournal
} from "../controllers/dailyJournal.controller.js";

const router = Router();

router.get("/", getDailyJournals);
router.get("/:id", getDailyJournalById);
router.post("/", createDailyJournal);
router.put("/:id", updateDailyJournal);
router.delete("/:id", deleteDailyJournal);

export default router;
