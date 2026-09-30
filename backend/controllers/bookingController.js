import mongoose from "mongoose";
import { Booking } from "../models/Booking.js";
import { EventType } from "../models/EventType.js";
import { Service } from "../models/Service.js";
import { Venue } from "../models/Venue.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const ensureId = (value, label) => {
    if (!mongoose.isValidObjectId(value)) {
        throw new ApiError(400, `${label} is invalid`);
    }
};

const getBookingForCustomer = async (bookingId, customerId) => {
    ensureId(bookingId, "Booking id");
    const booking = await Booking.findOne({ _id: bookingId, customer: customerId })
        .populate("eventType venue")
        .populate("selectedServices.service");

    if (!booking) throw new ApiError(404, "Booking not found");
    return booking;
};

const listCustomerBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ customer: req.user._id })
        .populate("eventType venue")
        .sort({ eventDate: 1 });

    res.status(200).json({ success: true, data: { bookings } });
});

const createBooking = asyncHandler(async (req, res) => {
    const {
        eventType,
        eventDate,
        guestCount,
        venue,
        selectedServices = [],
        customization = {},
        budget,
        notes,
    } = req.body;

    ensureId(eventType, "Event type");
    const event = await EventType.findOne({ _id: eventType, isActive: true, isPublished: true });
    if (!event) throw new ApiError(400, "A published event type is required");

    const parsedEventDate = new Date(eventDate);
    if (!eventDate || Number.isNaN(parsedEventDate.getTime()) || parsedEventDate < new Date()) {
        throw new ApiError(400, "A future event date is required");
    }

    if (!Number.isInteger(guestCount) || guestCount < 1) {
        throw new ApiError(400, "Guest count must be a positive whole number");
    }

    const eventDateKey = parsedEventDate.toISOString().slice(0, 10);
    const availabilitySlot = event.availability.find(
        (slot) => slot.isPublished && slot.date.toISOString().slice(0, 10) === eventDateKey,
    );
    const requiresDateApproval = !availabilitySlot;

    if (availabilitySlot && (guestCount < availabilitySlot.minGuests || guestCount > availabilitySlot.maxGuests)) {
        throw new ApiError(400, `Guest count must be between ${availabilitySlot.minGuests} and ${availabilitySlot.maxGuests} for this date`);
    }

    if (event.slug === "housewarming" && venue) {
        throw new ApiError(400, "Venue selection is not available for housewarming events");
    }

    let venuePrice = 0;
    if (venue) {
        ensureId(venue, "Venue");
        const venueRecord = await Venue.findOne({ _id: venue, isActive: true });
        if (!venueRecord || venueRecord.capacity < guestCount) {
            throw new ApiError(400, "Selected venue cannot accommodate this guest count");
        }
        venuePrice = venueRecord.priceFrom || 0;
    }

    const serviceIds = selectedServices.map((item) => item.service);
    if (serviceIds.some((id) => !mongoose.isValidObjectId(id))) {
        throw new ApiError(400, "One or more selected services are invalid");
    }

    const services = serviceIds.length
        ? await Service.find({ _id: { $in: serviceIds }, isActive: true })
        : [];
    if (services.length !== serviceIds.length) {
        throw new ApiError(400, "One or more selected services are unavailable");
    }

    const serviceMap = new Map(services.map((service) => [service._id.toString(), service]));
    const normalizedServices = selectedServices.map((item) => {
        const service = serviceMap.get(item.service.toString());
        const quantity = Number(item.quantity || 1);
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new ApiError(400, "Service quantity must be a positive whole number");
        }
        return {
            service: service._id,
            name: service.name,
            quantity,
            unitPrice: service.priceFrom || 0,
        };
    });

    const eventPrice = event.customizationPrice || 0;
    const servicesPrice = normalizedServices.reduce(
        (total, service) => total + service.unitPrice * service.quantity,
        0,
    );
    const totalPrice = eventPrice + venuePrice + servicesPrice;

    if (availabilitySlot && (totalPrice < availabilitySlot.minPrice || totalPrice > availabilitySlot.maxPrice)) {
        throw new ApiError(400, `This date accepts bookings between ${availabilitySlot.minPrice} and ${availabilitySlot.maxPrice}`);
    }

    const booking = await Booking.create({
        customer: req.user._id,
        eventType,
        eventDate,
        guestCount,
        venue: venue || undefined,
        selectedServices: normalizedServices,
        customization,
        eventPrice,
        venuePrice,
        customizationPrice: eventPrice,
        totalPrice,
        budget,
        notes,
        requiresDateApproval,
        paymentStatus: "pending",
        status: "draft",
    });

    const populatedBooking = await Booking.findById(booking._id).populate("eventType venue");
    res.status(201).json({ success: true, data: { booking: populatedBooking } });
});

const getCustomerBooking = asyncHandler(async (req, res) => {
    const booking = await getBookingForCustomer(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: { booking } });
});

const cancelCustomerBooking = asyncHandler(async (req, res) => {
    const booking = await getBookingForCustomer(req.params.id, req.user._id);
    if (["completed", "cancelled"].includes(booking.status)) {
        throw new ApiError(400, "This booking cannot be cancelled");
    }

    booking.status = "cancelled";
    await booking.save();
    res.status(200).json({ success: true, data: { booking } });
});

const simulatePayment = asyncHandler(async (req, res) => {
    const booking = await getBookingForCustomer(req.params.id, req.user._id);
    if (booking.status === "cancelled") throw new ApiError(400, "This booking is cancelled");
    if (booking.paymentStatus === "paid") {
        return res.status(200).json({ success: true, data: { booking }, message: "Payment is already complete" });
    }

    booking.paymentStatus = "paid";
    booking.paymentReference = `FAKE-${Date.now()}`;
    booking.paidAt = new Date();
    booking.status = booking.requiresDateApproval ? "pending" : "confirmed";
    await booking.save();

    res.status(200).json({ success: true, data: { booking }, message: "Fake payment completed successfully" });
});

const listAdminBookings = asyncHandler(async (_req, res) => {
    const bookings = await Booking.find()
        .populate("customer", "name email")
        .populate("eventType venue")
        .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: { bookings } });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
    const allowedStatuses = ["draft", "pending", "confirmed", "cancelled", "completed"];
    if (!allowedStatuses.includes(req.body.status)) {
        throw new ApiError(400, "Invalid booking status");
    }

    ensureId(req.params.id, "Booking id");
    const existingBooking = await Booking.findById(req.params.id);
    if (!existingBooking) throw new ApiError(404, "Booking not found");
    if (req.body.status === "confirmed" && existingBooking.paymentStatus !== "paid") {
        throw new ApiError(400, "Booking must be paid before it can be confirmed");
    }

    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
            ...(req.body.status === "confirmed" ? { requiresDateApproval: false } : {}),
        },
        { new: true, runValidators: true },
    ).populate("customer eventType venue");

    if (!booking) throw new ApiError(404, "Booking not found");
    res.status(200).json({ success: true, data: { booking } });
});

export {
    listCustomerBookings,
    createBooking,
    getCustomerBooking,
    cancelCustomerBooking,
    simulatePayment,
    listAdminBookings,
    updateBookingStatus,
};