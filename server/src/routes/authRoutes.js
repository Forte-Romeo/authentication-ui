import express from "express";

import { signup } from "../controllers/authController.js";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validateMiddleware.js";
import { validateSignup } from "../utils/userValidation.js";

const router = express.Router();

router.post(
    "/signup",
    validate(validateSignup),
    asyncHandler(signup)
);

export default router;