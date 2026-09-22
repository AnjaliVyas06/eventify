import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [80, "Name cannot exceed 80 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
        },
        passwordHash: {
            type: String,
            required: [true, "Password hash is required"],
            select: false,
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
