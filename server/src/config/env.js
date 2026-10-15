import "dotenv/config";
import process from "node:process";

const nodeEnv = process.env.NODE_ENV || "development";
const port = Number(process.env.PORT || 5000);

const env = {
    port,
    nodeEnv,
    databaseUrl: process.env.DATABASE_URL,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",

    frontendUrl: 
        process.env.CLIENT_URL ||
        (nodeEnv === "development"
            ? "http://localhost:5173"
            : undefined
        ),
};

if (!["development", "test", "production"].includes(nodeEnv)) {
    throw new Error(
        "NODE_ENV must be development, test, or production."
    );
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid port number.");
}

if (!env.databaseUrl) {
    throw new Error("Missing required environment variable: DATABASE_URL");
}

if (!env.jwtAccessSecret) {
    throw new Error(
        "Missing required environment variable: JWT_ACCESS_SECRET"
    );
}

if (nodeEnv === "production" && !env.frontendUrl) {
    throw new Error(
        "Missing required environment variable: FRONTEND_URL"
    );
}

export default env;