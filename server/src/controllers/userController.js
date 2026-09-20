import {
    findUserById,
    findUserByEmail,
    findAllUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../repositories/userRepository.js";

import {
    normalizeEmail,
    normalizeName,
} from "../utils/userValidation.js";

import { serializeUser } from "../utils/userSerializer.js";

const getUsers = async (req, res) => {
    const users = await findAllUsers();

    res.status(200).json({
        success: true,
        data: users.map(serializeUser),
    });
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await findUserById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        data: serializeUser(user),
    });
};

const getUserByEmail = async (req, res) => {
    const email = normalizeEmail(req.query.email || "");

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email query parameter is required",
        });
    }

    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        data: serializeUser(user),
    });
};

const createTestUser = async (req, res) => {
    const name = normalizeName(req.body.name);
    const email = normalizeEmail(req.body.email);

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "A user with this email already exists",
        });
    }

    /*
        This endpoint is only for testing the database layer.
        Real password hashing will be implemented during
        the Signup API phase.
    */
    const passwordHash = "PLACEHOLDER_HASH";

    const user = await createUser({
        name,
        email,
        passwordHash,
    });

    res.status(201).json({
        success: true,
        message: "Test user created",
        data: serializeUser(user),
    });
};

const updateUserById = async (req, res) => {
    const { id } = req.params;

    const updates = {};

    if (req.body.name !== undefined) {
        updates.name = normalizeName(req.body.name);
    }

    if (req.body.email !== undefined) {
        updates.email = normalizeEmail(req.body.email);
    }

    if (req.body.role !== undefined) {
        updates.role = req.body.role;
    }

    const user = await updateUser(id, updates);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: serializeUser(user),
    });
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
};

export {
    getUsers,
    getUserById,
    getUserByEmail,
    createTestUser,
    updateUserById,
    deleteUserById,
};