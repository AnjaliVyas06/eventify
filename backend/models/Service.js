import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Service name is required"],
            trim: true,
            minlength: [2, "Service name must be at least 2 characters"],
            maxlength: [80, "Service name cannot exceed 80 characters"],
        },
        slug: {
            type: String,
            required: [true, "Service slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens"],
        },
        description: {
            type: String,
            required: [true, "Service description is required"],
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        icon: {
            type: String,
            trim: true,
            maxlength: [10, "Icon cannot exceed 10 characters"],
        },
        category: {
            type: String,
            enum: ["planning", "venue", "food", "photography", "decoration", "budget", "other"],
            default: "other",
        },
        priceFrom: {
            type: Number,
            min: [0, "Starting price cannot be negative"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
