import express from "express";
import healthRoutes from "./healthRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/users", userRoutes);

export default router;