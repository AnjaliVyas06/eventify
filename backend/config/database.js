import mongoose from "mongoose";

const connectDatabase = async () => {
    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing from the environment");
    }

    await mongoose.connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB_NAME || "eventify",
        serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB Atlas connected");
};

export default connectDatabase;
