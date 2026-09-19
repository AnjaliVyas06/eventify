import "dotenv/config";
import http from "node:http";
import connectDatabase from "./config/database.js";
import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.PORT || 5000;
const server = http.createServer(app);

const startServer = async () => {
    await connectDatabase();

    server.listen(port, () => {
        console.log(`Eventify API listening on http://localhost:${port}`);
    });
};

const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

startServer().catch((error) => {
    console.error(`Unable to start Eventify API: ${error.message}`);
    process.exit(1);
});
