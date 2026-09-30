import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";

import wedding from "../assets/wedding-eve.jpg";
import birthday from "../assets/birthday-eve.jpg";
import eng from "../assets/engagement-eve.jpg";
import house from "../assets/house-eve.jpg";

function EventDetails() {
    const { eventId } = useParams();
    const [isVerified, setIsVerified] = useState(null);

    const events = {
        wedding: {
            title: "Wedding",
            icon: "💜",
            image: wedding,
            position: "center 55%",
            description:
                "Turn your special day into an unforgettable celebration filled with love, elegance and beautiful memories.",
        },
        birthday: {
            title: "Birthday",
            icon: "🎂",
            image: birthday,
            position: "center 33%",
            description:
                "Create a fun and memorable birthday celebration designed around your personality and your people.",
        },
        engagement: {
            title: "Engagement",
            icon: "💍",
            image: eng,
            position: "center 67%",
            description:
                "Celebrate the beginning of a beautiful journey with a perfectly planned engagement experience.",
        },
        housewarming: {
            title: "Housewarming",
            icon: "🏠",
            image: house,
            position: "center 55%",
            description:
                "Welcome a new chapter of your life with a warm, beautiful and memorable housewarming celebration.",
        },
    };

    const event = events[eventId];

    useEffect(() => {
        api.getEvents()
            .then(({ events: records }) => setIsVerified(records.some((record) => record.slug === eventId)))
            .catch(() => setIsVerified(false));
    }, [eventId]);

    if (isVerified === null) {
        return <div className="flex min-h-screen items-center justify-center bg-[#09070d] text-[#c084fc]">Loading verified event...</div>;
    }

    if (!event || !isVerified) {
        return (
            <div className="min-h-screen bg-[#09070d] text-white flex items-center justify-center px-5">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Event Not Found
                    </h1>

                    <p className="text-[#999] mb-6">
                        The event you're looking for doesn't exist.
                    </p>

                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[#7c3aed] text-white no-underline font-semibold hover:bg-[#8b5cf6] transition"
                    >
                        ← Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09070d] text-white">

            {/* HERO */}
            <section className="relative h-[480px] overflow-hidden">

                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: event.position }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#09070d] via-black/50 to-black/20" />

                <div className="absolute inset-0 flex items-end">

                    <div className="max-w-[1200px] w-full mx-auto px-6 pb-14">

                        <Link
                            to="/events"
                            className="inline-block text-sm text-[#ddd] no-underline mb-6 hover:text-white transition"
                        >
                            ← Back to Events
                        </Link>

                        <div className="flex items-center gap-4 mb-4">

                            <div className="w-14 h-14 flex items-center justify-center rounded-[15px] bg-black/60 backdrop-blur-md border border-white/10 text-2xl">
                                {event.icon}
                            </div>

                            <p className="text-[#c084fc] text-sm font-semibold tracking-[2px]">
                                EVENTIFY EXPERIENCE
                            </p>

                        </div>

                        <h1 className="text-[48px] md:text-[68px] font-bold leading-none">
                            {event.title}
                        </h1>

                    </div>
                </div>
            </section>


            {/* INTRO */}
            <section className="max-w-[1200px] mx-auto px-6 py-16">

                <div className="max-w-[800px]">

                    <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-3">
                        LET'S PLAN YOUR EVENT
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mb-5">
                        Make your {event.title.toLowerCase()} truly special.
                    </h2>

                    <p className="text-[#999] text-base leading-[1.8]">
                        {event.description}
                    </p>

                </div>


                {/* PLANNING OPTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">


                    {/* CUSTOMIZE */}
                    <Link
                        to={`/events/${eventId}/customize`}
                        className="group p-7 rounded-[18px] border border-[#292230] bg-[#111016] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6] no-underline text-white"
                    >

                        <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-[#7c3aed]/15 text-2xl mb-5">
                            🎨
                        </div>

                        <h3 className="text-xl font-bold mb-3">
                            Customize Your Event
                        </h3>

                        <p className="text-[#999] text-sm leading-[1.7]">
                            Choose themes, decorations, colors and other
                            details to create an event that feels like you.
                        </p>

                        <div className="mt-5 text-[#c084fc] font-semibold">
                            Start Customizing →
                        </div>

                    </Link>


                    {/* VENUE */}
                    {eventId !== "housewarming" && <Link
                        to={`/events/${eventId}/venue`}
                        className="group p-7 rounded-[18px] border border-[#292230] bg-[#111016] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6] no-underline text-white"
                    >

                        <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-[#7c3aed]/15 text-2xl mb-5">
                            📍
                        </div>

                        <h3 className="text-xl font-bold mb-3">
                            Find the Perfect Venue
                        </h3>

                        <p className="text-[#999] text-sm leading-[1.7]">
                            Explore venue options that match your event,
                            guest count and celebration style.
                        </p>

                        <div className="mt-5 text-[#c084fc] font-semibold">
                            Explore Venues →
                        </div>

                    </Link>}


                    {/* SERVICES */}
                    <Link
                        to={`/events/${eventId}/services`}
                        className="group p-7 rounded-[18px] border border-[#292230] bg-[#111016] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6] no-underline text-white"
                    >

                        <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-[#7c3aed]/15 text-2xl mb-5">
                            🍽️
                        </div>

                        <h3 className="text-xl font-bold mb-3">
                            Event Services
                        </h3>

                        <p className="text-[#999] text-sm leading-[1.7]">
                            Plan catering, photography, music, decoration
                            and other services for your celebration.
                        </p>

                        <div className="mt-5 text-[#c084fc] font-semibold">
                            Explore Services →
                        </div>

                    </Link>


                    {/* BUDGET */}
                    <Link
                        to={`/events/${eventId}/customize`}
                        className="group p-7 rounded-[18px] border border-[#292230] bg-[#111016] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6] no-underline text-white"
                    >

                        <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-[#7c3aed]/15 text-2xl mb-5">
                            💰
                        </div>

                        <h3 className="text-xl font-bold mb-3">
                            Plan Your Budget
                        </h3>

                        <p className="text-[#999] text-sm leading-[1.7]">
                            Configure your event and review the estimated
                            total for your celebration.
                        </p>

                        <div className="mt-5 text-[#c084fc] font-semibold">
                            Review Estimated Total →
                        </div>

                    </Link>

                </div>


                {/* BOTTOM CTA */}
                <div className="mt-12 p-8 md:p-10 rounded-[20px] border border-[#292230] bg-gradient-to-br from-[#17121f] to-[#100c16] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                    <div>

                        <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-2">
                            READY TO START?
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold">
                            Let's plan your {event.title.toLowerCase()}.
                        </h3>

                    </div>

                    <Link
                        to="/auth"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-[#7c3aed] text-white no-underline font-semibold transition-all duration-300 hover:bg-[#8b5cf6] hover:-translate-y-1 whitespace-nowrap"
                    >
                        Start Planning
                        <span>→</span>
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default EventDetails;