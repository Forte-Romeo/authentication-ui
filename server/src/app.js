import express from "express";
import env from "./config/env.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";
import notFound from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());

const allowedOrigins =
    env.nodeEnv === "production"
        ? [env.frontendUrl]
        : [
            env.frontendUrl,
            "http://127.0.0.1:5173",
        ];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api", apiRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;