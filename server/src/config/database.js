import pg from "pg";
import env from "./env.js";

const { Pool } = pg;

const pool = new Pool({
    connectionString: env.databaseUrl,

    // Connection pool limits.
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,

    // Prevent individual queries from running indefinitely.
    statement_timeout: 15_000,
});

pool.on("error", (error) => {
    console.error(
        "Unexpected error from an idle PostgreSQL client:",
        error.message
    );
});

const connectDatabase = async () => {
    let client;
    
    try {
        client = await pool.connect();

        await client.query("SELECT 1");

        console.log("PostgreSQL databse connected successfully");

    } catch (error) {
        console.error("PostgreSQL connection failed:", error.message);
        throw error;
    } finally {
        client?.release();
    }
};

export { pool, connectDatabase };