import process from "node:process";
import { pool } from "../config/database.js";

const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authentication API is running",
        environment : process.env.NODE_ENV || "development",
    });
};

const getDatabaseHealth = async (req, res) => {
    const result = await pool.query("SELECT NOW() AS current_time");

    res.status(200).json({
        success: true,
        message: "PostgreSQL database is connected",
        database: "authentication_db",
        time: result.rows[0].current_time,
    });
};

export { getHealth, getDatabaseHealth };