const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: globalThis.process?.env?.NODE_ENV === "production",
    sameSite:
        globalThis.process?.env?.NODE_ENV === "production"
            ? "strict"
            : "lax",
    path: "/api/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export {
    refreshTokenCookieOptions
}