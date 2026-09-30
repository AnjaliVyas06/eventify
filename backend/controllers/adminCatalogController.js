import mongoose from "mongoose";
import { EventType } from "../models/EventType.js";
import { Service } from "../models/Service.js";
import { Venue } from "../models/Venue.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const catalog = {
    events: {
        model: EventType,
        fields: ["name", "slug", "description", "image", "icon", "customizationPrice", "isActive"],
    },
    services: {
        model: Service,
        fields: ["name", "slug", "description", "icon", "category", "priceFrom", "isActive"],
    },
    venues: {
        model: Venue,
        fields: ["name", "description", "address", "capacity", "priceFrom", "images", "isActive"],
    },
};

const getCatalog = (type) => {
    const entry = catalog[type];
    if (!entry) throw new ApiError(404, "Catalog type not found");
    return entry;
};

const assertEventOwner = (event, adminId) => {
    if (event.adminOwner && event.adminOwner.toString() !== adminId.toString()) {
        throw new ApiError(403, "This event is assigned to another admin");
    }
};

const pickFields = (body, fields) => Object.fromEntries(
    fields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]]),
);

const listAdminCatalog = asyncHandler(async (req, res) => {
    const { model } = getCatalog(req.params.type);
    const items = await model.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { items } });
});

const createCatalogItem = asyncHandler(async (req, res) => {
    const { model, fields } = getCatalog(req.params.type);
    const values = pickFields(req.body, fields);
    if (req.params.type === "events") {
        values.isPublished = false;
        delete values.isActive;
        values.adminOwner = req.user._id;
    }
    const item = await model.create(values);
    res.status(201).json({ success: true, data: { item } });
});

const updateCatalogItem = asyncHandler(async (req, res) => {
    const { model, fields } = getCatalog(req.params.type);
    if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Catalog item id is invalid");

    if (req.params.type === "events") {
        const existingEvent = await EventType.findById(req.params.id);
        if (!existingEvent) throw new ApiError(404, "Catalog item not found");
        assertEventOwner(existingEvent, req.user._id);
        if (!existingEvent.adminOwner) {
            await EventType.updateOne({ _id: existingEvent._id }, { $set: { adminOwner: req.user._id } });
        }
    }

    const item = await model.findByIdAndUpdate(
        req.params.id,
        pickFields(req.body, fields),
        { new: true, runValidators: true },
    );
    if (!item) throw new ApiError(404, "Catalog item not found");
    res.status(200).json({ success: true, data: { item } });
});

const deactivateCatalogItem = asyncHandler(async (req, res) => {
    const { model } = getCatalog(req.params.type);
    if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Catalog item id is invalid");

    if (req.params.type === "events") {
        const event = await EventType.findById(req.params.id);
        if (!event) throw new ApiError(404, "Catalog item not found");
        assertEventOwner(event, req.user._id);
    }

    const item = await model.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!item) throw new ApiError(404, "Catalog item not found");
    res.status(200).json({ success: true, data: { item } });
});

const addEventAvailability = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Event id is invalid");

    const { date, minGuests, maxGuests, minPrice, maxPrice } = req.body;
    const parsedDate = new Date(date);
    if (!date || Number.isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
        throw new ApiError(400, "A future availability date is required");
    }
    if (![minGuests, maxGuests].every((value) => Number.isInteger(value) && value > 0) || minGuests > maxGuests) {
        throw new ApiError(400, "Guest limits are invalid");
    }
    if (![minPrice, maxPrice].every((value) => Number.isFinite(value) && value >= 0) || minPrice > maxPrice) {
        throw new ApiError(400, "Price limits are invalid");
    }

    const event = await EventType.findById(req.params.id);
    if (!event) throw new ApiError(404, "Event not found");
    assertEventOwner(event, req.user._id);

    const dateKey = parsedDate.toISOString().slice(0, 10);
    if (event.availability.some((slot) => slot.date.toISOString().slice(0, 10) === dateKey)) {
        throw new ApiError(409, "This event already has availability for that date");
    }

    event.availability.push({ date: parsedDate, minGuests, maxGuests, minPrice, maxPrice, publishedBy: req.user._id });
    await event.save();
    res.status(201).json({ success: true, data: { item: event } });
});

const removeEventAvailability = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(req.params.availabilityId)) {
        throw new ApiError(400, "Event or availability id is invalid");
    }

    const existingEvent = await EventType.findById(req.params.id);
    if (!existingEvent) throw new ApiError(404, "Event not found");
    assertEventOwner(existingEvent, req.user._id);

    const event = await EventType.findByIdAndUpdate(
        req.params.id,
        { $pull: { availability: { _id: req.params.availabilityId } } },
        { new: true },
    );
    res.status(200).json({ success: true, data: { item: event } });
});

const publishEvent = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Event id is invalid");
    const existingEvent = await EventType.findById(req.params.id);
    if (!existingEvent) throw new ApiError(404, "Event not found");
    assertEventOwner(existingEvent, req.user._id);

    const event = await EventType.findByIdAndUpdate(
        req.params.id,
        { isPublished: true, publishedBy: req.user._id, publishedAt: new Date(), isActive: true, adminOwner: req.user._id },
        { new: true, runValidators: true },
    ).populate("publishedBy", "name email");

    res.status(200).json({ success: true, data: { item: event } });
});

const unpublishEvent = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Event id is invalid");
    const existingEvent = await EventType.findById(req.params.id);
    if (!existingEvent) throw new ApiError(404, "Event not found");
    assertEventOwner(existingEvent, req.user._id);

    const event = await EventType.findByIdAndUpdate(
        req.params.id,
        { isPublished: false, adminOwner: existingEvent.adminOwner || req.user._id },
        { new: true },
    );

    res.status(200).json({ success: true, data: { item: event } });
});

export {
    listAdminCatalog,
    createCatalogItem,
    updateCatalogItem,
    deactivateCatalogItem,
    publishEvent,
    unpublishEvent,
    addEventAvailability,
    removeEventAvailability,
};