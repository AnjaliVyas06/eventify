import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateAdminToken = (admin) => {
    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, "JWT_SECRET is missing from the environment");
    }

    return jwt.sign(
        { _id: admin._id.toString(), role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
    );
};

const getPublicAdmin = (admin) => ({
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
});

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, signupKey } = req.body;

    if ([name, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "Name, email, and password are required");
    }

    if (!process.env.ADMIN_SIGNUP_KEY || signupKey !== process.env.ADMIN_SIGNUP_KEY) {
        throw new ApiError(403, "A valid admin signup key is required");
    }

    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingAdmin = await User.findOne({ email: normalizedEmail });

    if (existingAdmin) {
        throw new ApiError(409, "User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: "admin",
    });

    const accessToken = generateAdminToken(admin);

    return res.status(201).json({
        success: true,
        data: {
            user: getPublicAdmin(admin),
            token: accessToken,
        },
        message: "Admin registered successfully",
    });
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const admin = await User.findOne({
        email: email.toLowerCase().trim(),
        role: "admin",
    }).select("+passwordHash");

    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
        throw new ApiError(401, "Invalid admin email or password");
    }

    if (!admin.isActive) {
        throw new ApiError(403, "This admin account is inactive");
    }

    return res.status(200).json({
        success: true,
        data: {
            user: getPublicAdmin(admin),
            token: generateAdminToken(admin),
        },
        message: "Admin logged in successfully",
    });
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        data: { user: getPublicAdmin(req.user) },
        message: "Current admin fetched successfully",
    });
});

export { registerAdmin, loginAdmin, getCurrentAdmin };
