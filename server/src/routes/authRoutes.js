import express from "express";

import { signup, login } from "../controllers/authController.js";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validateMiddleware.js";
import { validateSignup, validateLogin } from "../utils/userValidation.js";

const router = express.Router();

router.post(
    "/signup",
    validate(validateSignup),
    asyncHandler(signup)
);

router.post(
    "/login",
    validate(validateLogin),
    asyncHandler(login)
);

export default router;