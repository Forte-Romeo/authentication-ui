import "dotenv/config";
import process from "node:process";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Authentication API running on port ${PORT}`);
});