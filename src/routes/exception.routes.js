import { Router } from "express";
import {
  getExceptions,
  getExceptionById,
  createException,
  updateException,
  deleteException
} from "../controllers/exception.controller.js";

const router = Router();

router.get("/", getExceptions);
router.get("/:id", getExceptionById);
router.post("/", createException);
router.put("/:id", updateException);
router.delete("/:id", deleteException);

export default router;
