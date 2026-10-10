import {
    createRefreshToken,
    findRefreshTokenByHash,
} from "../repositories/refreshTokenRepository.js";

import {
    generateRefreshToken,
    hashRefreshToken,
} from "../utils/refreshToken.js";

function getRefreshTokenExpiration() {
    const expiresAt = new Date();

    expiresAt.setDate(
        expiresAt.getDate() + 7
    );

    return expiresAt;
}

async function issueRefreshToken(userId) {
    const rawToken = generateRefreshToken();

    const tokenHash = hashRefreshToken(rawToken);

    const expiresAt = getRefreshTokenExpiration();

    const storedToken =
        await createRefreshToken({
            userId,
            tokenHash,
            expiresAt,
        });

    return {
        rawToken,
        storedToken,
    };
}

async function validateRefreshToken(rawToken) {
    const tokenHash = hashRefreshToken(rawToken);

    const storedToken = await findRefreshTokenByHash(tokenHash);

    if (!storedToken) {
        return null;
    }

    if (storedToken.revoked_at) {
        return null;
    }

    if (
        new Date(storedToken.expires_at) <=
        new Date()
    ) {
        return null;
    }

    return storedToken;
}

export {
    issueRefreshToken,
    validateRefreshToken,
};