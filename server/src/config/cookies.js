import env from "./env.js";

const isProduction = env.nodeEnv === "production";

const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    path: "/api/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export {
    refreshTokenCookieOptions
}