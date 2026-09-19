import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import process from "node:process";

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(env.port, () => {
            console.log(
                `Authentication API running on http://localhost:${env.port}`
            );
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();