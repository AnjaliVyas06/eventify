import cors from "cors";
import express from "express";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.disable("x-powered-by");
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
}));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Eventify API is running",
    });
});

app.use((_req, _res, next) => {
    next(new ApiError(404, "Route not found"));
});

app.use(errorHandler);

export default app;
