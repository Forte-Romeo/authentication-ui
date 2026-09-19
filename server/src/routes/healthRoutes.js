import express from "express";
import { getHealth, getDatabaseHealth } from "../controllers/healthController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", getHealth);

router.get("/database", asyncHandler(getDatabaseHealth));

export default router;