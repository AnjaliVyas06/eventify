import mongoose, { Schema } from "mongoose";

const selectedServiceSchema = new Schema(
    {
        service: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Selected service name is required"],
            trim: true,
        },
        quantity: {
            type: Number,
            default: 1,
            min: [1, "Quantity must be at least 1"],
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number",
            },
        },
        unitPrice: {
            type: Number,
            required: [true, "Selected service price is required"],
            min: [0, "Unit price cannot be negative"],
        },
    },
    { _id: false },
);

const bookingSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Customer is required"],
            index: true,
        },
        eventType: {
            type: Schema.Types.ObjectId,
            ref: "EventType",
            required: [true, "Event type is required"],
        },
        eventDate: {
            type: Date,
            required: [true, "Event date is required"],
            validate: {
                validator: (value) => value >= new Date(),
                message: "Event date must be in the future",
            },
        },
        guestCount: {
            type: Number,
            required: [true, "Guest count is required"],
            min: [1, "Guest count must be at least 1"],
            validate: {
                validator: Number.isInteger,
                message: "Guest count must be a whole number",
            },
        },
        venue: {
            type: Schema.Types.ObjectId,
            ref: "Venue",
        },
        selectedServices: {
            type: [selectedServiceSchema],
            default: [],
        },
        customization: {
            theme: {
                type: String,
                trim: true,
                maxlength: [100, "Theme cannot exceed 100 characters"],
            },
            colors: {
                type: [String],
                validate: {
                    validator: (colors) => colors.length <= 10,
                    message: "A maximum of 10 colors can be selected",
                },
            },
            specialRequirements: {
                type: String,
                trim: true,
                maxlength: [1000, "Special requirements cannot exceed 1000 characters"],
            },
        },
        budget: {
            type: Number,
            min: [0, "Budget cannot be negative"],
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [1000, "Notes cannot exceed 1000 characters"],
        },
        status: {
            type: String,
            enum: ["draft", "pending", "confirmed", "cancelled", "completed"],
            default: "draft",
            required: true,
        },
    },
    { timestamps: true },
);

bookingSchema.index({ customer: 1, eventDate: 1 });
bookingSchema.index({ venue: 1, eventDate: 1, status: 1 });

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
