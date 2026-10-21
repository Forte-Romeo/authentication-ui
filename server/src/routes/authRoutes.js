import express from "express";

import { signup, login, refreshAccessToken, logout } from "../controllers/authController.js";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validateMiddleware.js";
import { validateSignup, validateLogin } from "../utils/userValidation.js";
import { signupLimiter, loginLimiter, refreshLimiter } from "../middleware/rateLimiters.js";
import verifyOrigin from "../middleware/verifyOrigin.js";

const router = express.Router();

router.post(
    "/signup",
    verifyOrigin,
    signupLimiter,
    validate(validateSignup),
    asyncHandler(signup)
);

router.post(
    "/login",
    verifyOrigin,
    loginLimiter,
    validate(validateLogin),
    asyncHandler(login)
);

router.post(
    "/refresh",
    verifyOrigin,
    refreshLimiter,
    asyncHandler(refreshAccessToken)
);

router.post(
    "/logout",
    verifyOrigin,
    asyncHandler(logout)
);

export default router;