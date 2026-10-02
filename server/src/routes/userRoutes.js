import express from "express";

import {
    getUsers,
    getCurrentUser,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.get(
    "/",
    asyncHandler(getUsers)
);

router.get(
    "/search",
    asyncHandler(getUserByEmail)
);

router.get(
    "/me",
    authenticate,
    asyncHandler(getCurrentUser)
);

router.get(
    "/:id",
    asyncHandler(getUserById)
);

router.patch(
    "/:id",
    asyncHandler(updateUserById)
);

router.delete(
    "/:id",
    asyncHandler(deleteUserById)
);

export default router;