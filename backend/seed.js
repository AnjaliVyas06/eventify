import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import { EventType } from "./models/EventType.js";
import { Service } from "./models/Service.js";
import { Venue } from "./models/Venue.js";

const eventTypes = [
    { name: "Wedding", slug: "wedding", description: "Plan an elegant and memorable wedding celebration.", icon: "💜", customizationPrice: 2500, isPublished: true, availability: [{ date: "2027-03-20", minGuests: 50, maxGuests: 500, minPrice: 5000, maxPrice: 100000 }] },
    { name: "Birthday", slug: "birthday", description: "Create a fun birthday celebration designed around your personality.", icon: "🎂", customizationPrice: 800, isPublished: true, availability: [{ date: "2027-02-14", minGuests: 10, maxGuests: 150, minPrice: 1500, maxPrice: 30000 }] },
    { name: "Engagement", slug: "engagement", description: "Celebrate the beginning of a beautiful journey.", icon: "💍", customizationPrice: 1400, isPublished: true, availability: [{ date: "2027-04-10", minGuests: 20, maxGuests: 250, minPrice: 3000, maxPrice: 50000 }] },
    { name: "Housewarming", slug: "housewarming", description: "Welcome a new chapter with a warm housewarming celebration.", icon: "🏠", customizationPrice: 1000, isPublished: true, availability: [{ date: "2027-01-16", minGuests: 10, maxGuests: 100, minPrice: 1500, maxPrice: 20000 }] },
];

const services = [
    { name: "Catering", slug: "catering", description: "Food and catering options for every celebration.", icon: "🍽️", category: "food", priceFrom: 500 },
    { name: "Photography", slug: "photography", description: "Capture the important moments of your event.", icon: "📸", category: "photography", priceFrom: 800 },
    { name: "Decoration", slug: "decoration", description: "Transform your venue with a beautiful event theme.", icon: "🌸", category: "decoration", priceFrom: 700 },
];

const venues = [
    { name: "The Grand Hall", description: "A spacious venue for large celebrations.", address: "City Center", capacity: 500, priceFrom: 5000 },
    { name: "Garden Terrace", description: "An open-air venue for intimate events.", address: "Green Avenue", capacity: 150, priceFrom: 2500 },
];

const seedCollection = async (Model, records, uniqueField) => {
    for (const record of records) {
        await Model.updateOne({ [uniqueField]: record[uniqueField] }, { $setOnInsert: record }, { upsert: true });
    }
};

try {
    await connectDB();
    await seedCollection(EventType, eventTypes, "slug");
    for (const event of eventTypes) {
        await EventType.updateOne(
            { slug: event.slug },
            { $set: { isPublished: true, customizationPrice: event.customizationPrice, availability: event.availability } },
        );
    }
    await seedCollection(Service, services, "slug");
    await seedCollection(Venue, venues, "name");
    console.log("Eventify seed data inserted");
} finally {
    await mongoose.disconnect();
}