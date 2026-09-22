import mongoose, { Schema } from "mongoose";

const venueSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Venue name is required"],
            trim: true,
            minlength: [2, "Venue name must be at least 2 characters"],
            maxlength: [120, "Venue name cannot exceed 120 characters"],
        },
        description: {
            type: String,
            required: [true, "Venue description is required"],
            trim: true,
            maxlength: [600, "Description cannot exceed 600 characters"],
        },
        address: {
            type: String,
            required: [true, "Venue address is required"],
            trim: true,
            maxlength: [250, "Address cannot exceed 250 characters"],
        },
        capacity: {
            type: Number,
            required: [true, "Venue capacity is required"],
            min: [1, "Venue capacity must be at least 1"],
            validate: {
                validator: Number.isInteger,
                message: "Venue capacity must be a whole number",
            },
        },
        priceFrom: {
            type: Number,
            required: [true, "Venue starting price is required"],
            min: [0, "Venue price cannot be negative"],
        },
        images: [
            {
                type: String,
                match: [/^https?:\/\/.+/, "Each venue image must be a valid URL"],
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export const Venue = mongoose.models.Venue || mongoose.model("Venue", venueSchema);
