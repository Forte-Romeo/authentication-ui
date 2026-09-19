import pg from "pg";
import env from "./env.js";

const { Pool } = pg;

const pool = new Pool({
    connectionString: env.databaseUrl,
});

const connectDatabase = async () => {
    try {
        const client = await pool.connect();

        console.log("PostgreSQL databse connected successfully");

        client.release();
    } catch (error) {
        console.error("PostgreSQL connection failed:", error.message);
        throw error;
    }
};

export { pool, connectDatabase };