import { EventType } from "../models/EventType.js";
import { Service } from "../models/Service.js";
import { Venue } from "../models/Venue.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const listEventTypes = asyncHandler(async (_req, res) => {
    const events = await EventType.find({ isActive: true, isPublished: true }).sort({ name: 1 });
    res.status(200).json({ success: true, data: { events } });
});

const getEventType = asyncHandler(async (req, res) => {
    const event = await EventType.findOne({ slug: req.params.slug, isActive: true, isPublished: true });

    if (!event) {
        throw new ApiError(404, "Event type not found");
    }

    res.status(200).json({ success: true, data: { event } });
});

const listServices = asyncHandler(async (req, res) => {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;

    const services = await Service.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, data: { services } });
});

const listVenues = asyncHandler(async (req, res) => {
    const filter = { isActive: true };
    const minimumCapacity = Number(req.query.capacity);

    if (Number.isInteger(minimumCapacity) && minimumCapacity > 0) {
        filter.capacity = { $gte: minimumCapacity };
    }

    const venues = await Venue.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, data: { venues } });
});

export { listEventTypes, getEventType, listServices, listVenues };