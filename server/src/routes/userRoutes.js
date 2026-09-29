import express from "express";

import {
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
} from "../controllers/userController.js";

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