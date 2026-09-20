import express from "express";

import {
    getUsers,
    getUserById,
    getUserByEmail,
    createTestUser,
    updateUserById,
    deleteUserById,
} from "../controllers/userController.js";

import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validateMiddleware.js";
import { validateCreateUser } from "../utils/userValidation.js";

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
    "/:id",
    asyncHandler(getUserById)
);

router.post(
    "/test",
    validate(validateCreateUser),
    asyncHandler(createTestUser)
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