import {
    findUserByEmail,
    createUser,
} from "../repositories/userRepository.js";

import {
    normalizeEmail,
    normalizeName,
} from "../utils/userValidation.js";

import { hashPassword, comparePassword } from "../utils/password.js";
import { serializeUser } from "../utils/userSerializer.js";

import { generateAccessToken } from "../utils/jwt.js";

const signup = async (req, res) => {
    const name = normalizeName(req.body.name);
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "An account with this email already exists",
        });
    }

    const passwordHash = await hashPassword(password);

    const user = await createUser({
        name,
        email,
        passwordHash,
    });

    res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: serializeUser(user),
    });
};

const login = async (req, res) => {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const passwordMatches = await comparePassword(
        password,
        user.password_hash
    );

    if (!passwordMatches) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const accessToken = generateAccessToken(user);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: serializeUser(user),
            accessToken,
        }
    });
};

export { signup, login };