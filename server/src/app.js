import express from "express";
import process from "node:process";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";
import notFound from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(
    cors({
        origin: [
            process.env.CLIENT_URL,
            "http://127.0.0.1:5173",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;