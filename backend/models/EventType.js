import mongoose, { Schema } from "mongoose";

const eventTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Event type name is required"],
            trim: true,
            minlength: [2, "Event type name must be at least 2 characters"],
            maxlength: [60, "Event type name cannot exceed 60 characters"],
        },
        slug: {
            type: String,
            required: [true, "Event type slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens"],
        },
        description: {
            type: String,
            required: [true, "Event type description is required"],
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        image: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, "Image must be a valid URL"],
        },
        icon: {
            type: String,
            trim: true,
            maxlength: [10, "Icon cannot exceed 10 characters"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export const EventType = mongoose.models.EventType || mongoose.model("EventType", eventTypeSchema);
