import jwt from "jsonwebtoken";
import env from "../config/env.js";

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user.id,
            role: user.role,
        },
        env.jwtAccessSecret,
        {
            expiresIn: env.jwtAccessExpiresIn,
        }
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        env.jwtAccessSecret,
    );
};

export {
    generateAccessToken,
    verifyAccessToken,
};