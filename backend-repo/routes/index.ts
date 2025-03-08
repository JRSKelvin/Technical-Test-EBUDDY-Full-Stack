import express, { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import authMiddleware from "../middleware/authMiddleware";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);

export default router;
