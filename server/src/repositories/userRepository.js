import { pool } from "../config/database.js";

const findUserById = async (id) => {
    const result = await pool.query(
        `
            SELECT
                id,
                name,
                email,
                password_hash,
                role,
                created_at,
                updated_at
            FROM users
            WHERE id = $1
            LIMIT 1
        `,
        [id]
    );

    return result.rows[0] || null;
};

const findUserByEmail = async (email) => {
    const result = await pool.query(
        `
            SELECT
                id,
                name,
                email,
                password_hash,
                role,
                created_at,
                updated_at
            FROM users
            WHERE LOWER(email) = LOWER($1)
        `,
        [email]
    );

    return result.rows[0] || null;
};

const findAllUsers = async () => {
    const result = await pool.query(
        `
            SELECT
                id,
                name,
                email,
                password_hash,
                role,
                created_at,
                updated_at
            FROM users
            ORDER BY created_at DESC
        `
    );

    return result.rows;
};

const createUser = async ({
    name,
    email,
    passwordHash,
    role = "user",
}) => {
    const result = await pool.query(
        `
            INSERT INTO users (
                name,
                email,
                password_hash,
                role
            )
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                name,
                email,
                role,
                created_at,
                updated_at
        `,
        [name, email, passwordHash, role]
    );

    return result.rows[0];
};

const updateUser = async (
    id,
    { name, email, role }
) => {
    const result = await pool.query(
        `
            UPDATE users
            SET
                name = COALESCE($1, name),
                email = COALESCE($2, email),
                role = COALESCE($3, role),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING
                id,
                name,
                email,
                role,
                created_at,
                updated_at
        `,
        [
            name ?? null,
            email ?? null,
            role ?? null,
            id,
        ]
    );

    return result.rows[0] || null;
};

const deleteUser = async (id) => {
    const result = await pool.query(
        `
            DELETE FROM users
            WHERE id = $1
            RETURNING id
        `,
        [id]
    );

    return result.rows[0] || null;
};

export {
    findUserById,
    findUserByEmail,
    findAllUsers,
    createUser,
    updateUser,
    deleteUser,
};