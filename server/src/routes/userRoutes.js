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
import requireAdmin from "../middleware/requireAdmin.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// Administrator-only user management.
router.get(
    "/",
    authenticate,
    requireAdmin,
    asyncHandler(getUsers)
);

router.get(
    "/search",
    authenticate,
    requireAdmin,
    asyncHandler(getUserByEmail)
);

router.get(
    "/me",
    authenticate,
    asyncHandler(getCurrentUser)
);

router.get(
    "/:id",
    authenticate,
    requireAdmin,
    asyncHandler(getUserById)
);

router.patch(
    "/:id",
    authenticate,
    requireAdmin,
    asyncHandler(updateUserById)
);

router.delete(
    "/:id",
    authenticate,
    requireAdmin,
    asyncHandler(deleteUserById)
);

export default router;