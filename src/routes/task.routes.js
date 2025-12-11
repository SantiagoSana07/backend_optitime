import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getTasks);
router.get("/:id", verifyToken, getTaskById);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
