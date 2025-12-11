import { Router } from "express";
import {
  getDailyJournals,
  getDailyJournalById,
  createDailyJournal,
  updateDailyJournal,
  deleteDailyJournal
} from "../controllers/dailyJournal.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getDailyJournals);
router.get("/:id", verifyToken, getDailyJournalById);
router.post("/", verifyToken, createDailyJournal);
router.put("/:id", verifyToken, updateDailyJournal);
router.delete("/:id", verifyToken, deleteDailyJournal);

export default router;
