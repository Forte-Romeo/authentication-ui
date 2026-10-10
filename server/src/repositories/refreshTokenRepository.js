import { pool } from "../config/database.js";

const createRefreshToken = async ({
    userId,
    tokenHash,
    expiresAt,
}) => {
    const result = await pool.query(
        `
            INSERT INTO refresh_tokens (
                user_id,
                token_hash,
                expires_at
            )
            VALUES ($1, $2, $3)
            RETURNING
                id,
                user_id,
                token_hash,
                expires_at,
                created_at,
                revoked_at,
                replaced_by_token_id
        `,
        [
            userId,
            tokenHash,
            expiresAt,
        ]
    );

    return result.rows[0];
};

const findRefreshTokenByHash = async (
    tokenHash
) => {
    const result = await pool.query(
        `
            SELECT
                id,
                user_id,
                token_hash,
                expires_at,
                created_at,
                revoked_at,
                replaced_by_token_id
            FROM refresh_tokens
            WHERE token_hash = $1
            LIMIT 1
        `,
        [tokenHash]
    );

    return result.rows[0] || null;
};

const revokeRefreshToken = async (
    tokenId
) => {
    const result = await pool.query(
        `
            UPDATE refresh_tokens
            SET revoked_at = NOW()
            WHERE id =$1
                AND revoked_at IS NULL
            RETURNING *
        `,
        [tokenId]
    );

    return result.rows[0] || null;
};

const rotateRefreshToken = async ({
    oldTokenId,
    newTokenId,
}) => {
    const result = await pool.query(
        `
            UPDATE refresh_tokens
            SET
                revoked_at = NOW(),
                replaced_by_token_id = $2
            WHERE id = $1
                AND revoked_at IS NULL
            RETURNING *
        `,
        [
            oldTokenId,
            newTokenId,
        ]
    );

    return result.rows[0] || null;
};

export {
    createRefreshToken,
    findRefreshTokenByHash,
    revokeRefreshToken,
    rotateRefreshToken,
};