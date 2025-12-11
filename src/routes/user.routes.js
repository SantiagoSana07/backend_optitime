import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
