import mongoose, { Schema } from "mongoose";

const availabilitySchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        minGuests: {
            type: Number,
            required: true,
            min: 1,
        },
        maxGuests: {
            type: Number,
            required: true,
            min: 1,
        },
        minPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        maxPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        publishedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        adminOwner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

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
        customizationPrice: {
            type: Number,
            default: 0,
            min: [0, "Customization price cannot be negative"],
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        publishedAt: {
            type: Date,
        },
        availability: {
            type: [availabilitySchema],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export const EventType = mongoose.models.EventType || mongoose.model("EventType", eventTypeSchema);
