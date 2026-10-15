import { rateLimit } from "express-rate-limit";

const createAuthLimiter = ({ windowMs, limit, message }) => {
    return rateLimit({
        windowMs,
        limit,
        standardHeaders: true,
        legacyHeaders: false,

        message: {
            success: false,
            message,
        },

        handler: (req, res, next, options) => {
            res.status(options.statusCode).json(options.message);
        },
    });
};

const signupLimiter = createAuthLimiter({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    message: "Too many signup attempts. Please try again later.",
});

const loginLimiter = createAuthLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: "Too many login attempts. Please try again in 15 minutes.",
});

const refreshLimiter = createAuthLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    message: "Too many token refresh requests. Please try again later.",
});

export {
    signupLimiter,
    loginLimiter,
    refreshLimiter,
};