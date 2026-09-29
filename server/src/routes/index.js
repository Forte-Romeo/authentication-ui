import express from "express";

import healthRoutes from "./healthRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;