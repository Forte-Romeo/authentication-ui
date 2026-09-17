import "dotenv/config";
import process from "node:process";

const env = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
};

export default env;