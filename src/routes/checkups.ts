import express from "express";
const router = express.Router();

import { getAllCheckups, getCheckupsByUserId, addCheckup } from "../controllers/checkupsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.get("/checkups", authMiddleware, getAllCheckups);
router.get("/checkups/:userId", authMiddleware, getCheckupsByUserId);
router.post("/checkups", authMiddleware, addCheckup);

export default router;