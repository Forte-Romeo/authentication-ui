CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'user',

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_check
        CHECK (role IN('user', 'admin'))
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique
ON users (LOWER(email));