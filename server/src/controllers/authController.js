import {
    findUserByEmail,
    createUser,
    findUserById,
} from "../repositories/userRepository.js";

import {
    normalizeEmail,
    normalizeName,
} from "../utils/userValidation.js";

import { hashPassword, comparePassword } from "../utils/password.js";
import { serializeUser } from "../utils/userSerializer.js";

import { generateAccessToken } from "../utils/jwt.js";

import { issueRefreshToken, validateRefreshToken } from "../services/refreshTokenService.js";
import { revokeRefreshToken, rotateRefreshToken } from "../repositories/refreshTokenRepository.js";
import { refreshTokenCookieOptions } from "../config/cookies.js";

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

    const {
        rawToken: refreshToken,
    } = await issueRefreshToken(user.id);

    res.cookie(
        "refreshToken",
        refreshToken,
        refreshTokenCookieOptions
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: serializeUser(user),
            accessToken,
        }
    });
};

const refreshAccessToken = async (
    req,
    res
) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token required",
        });
    }

    const storedToken = await validateRefreshToken(refreshToken);

    if (!storedToken) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }

    const user = 
        await findUserById(
            storedToken.user_id
        );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }

    const accessToken = 
        generateAccessToken(user);

    const {
        rawToken: newRefreshToken,
        storedToken: newStoredToken,
    } = await issueRefreshToken(user.id);

    await rotateRefreshToken({
        oldTokenId: storedToken.id,
        newTokenId: newStoredToken.id,
    });

    res.cookie(
        "refreshToken",
        newRefreshToken,
        refreshTokenCookieOptions
    );

    return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
            accessToken,
        },
    });
};

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        const storedToken =
            await validateRefreshToken(
                refreshToken
            );

        if (storedToken) {
            await revokeRefreshToken(
                storedToken.id
            );
        }
    }

    res.clearCookie(
        "refreshToken",
        refreshTokenCookieOptions
    );

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

export { signup, login, refreshAccessToken, logout };