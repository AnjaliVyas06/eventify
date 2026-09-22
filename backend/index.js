import "dotenv/config";
import http from "node:http";
import connectDB from "./config/database.js";
import app from "./app.js";

const port = process.env.PORT || 5000;
const server = http.createServer(app);

const startServer = async () => {
    await connectDB();

    server.listen(port, () => {
        console.log(`Eventify API listening on http://localhost:${port}`);
    });
};



startServer().catch((error) => {
    console.error(`Unable to start Eventify API: ${error.message}`);
    process.exit(1);
});
