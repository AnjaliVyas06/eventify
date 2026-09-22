import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Verify the JWT and attach the logged-in user to req.user.
const verifyJWT = asyncHandler(async (req, _res, next) => {
    try {
        const authHeader = req.header("Authorization") || "";
        const bearerToken = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : "";
        const token = req.cookies?.accessToken || bearerToken;

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        if (!process.env.JWT_SECRET) {
            throw new ApiError(500, "JWT_SECRET is missing from the environment");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user || !user.isActive) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof ApiError && error.statusCode === 500) {
            throw error;
        }

        throw new ApiError(401, error.message || "Invalid access token");
    }
});

export default verifyJWT;
