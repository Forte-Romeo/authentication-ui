import env from "../config/env.js";

const allowedOrigins =
    env.nodeEnv === "production"
        ? [env.frontendUrl]
        : [
            env.frontendUrl,
            "http://127.0.0.1:5173",
        ];

const verifyOrigin = (req, res, next) => {
    const origin = req.get("Origin");

    if (!origin || !allowedOrigins.includes(origin)) {
        return res.status(403).json({
            success: false,
            message: "Request origin is not allowed.",
        });
    }

    return next();
};

export default verifyOrigin;
