import "./Events.css";
import { Link } from "react-router-dom";

import wedding from "../assets/wedding.jpg";
import birthday from "../assets/birthday.jpg";
import eng from "../assets/eng.jpg";
import house from "../assets/house.jpg";

function Events() {
    const events = [
        {
            id: "wedding",
            title: "Wedding",
            description:
                "Turn your special day into an unforgettable celebration filled with love, elegance and beautiful memories.",
            image: wedding,
            icon: "💜",
        },
        {
            id: "birthday",
            title: "Birthday",
            description:
                "Create a fun and memorable birthday celebration designed around your personality and your people.",
            image: birthday,
            icon: "🎂",
        },
        {
            id: "engagement",
            title: "Engagement",
            description:
                "Celebrate the beginning of a beautiful journey with a perfectly planned engagement experience.",
            image: eng,
            icon: "💍",
        },
        {
            id: "housewarming",
            title: "Housewarming",
            description:
                "Welcome a new chapter of your life with a warm, beautiful and memorable housewarming celebration.",
            image: house,
            icon: "🏠",
        },
    ];

    return (
        <div className="events-page">

            {/* HERO */}
            <section className="events-hero">
                <p className="events-small-title">
                    ✦ EVENTIFY EXPERIENCES
                </p>

                <h1>
                    Choose Your
                    <span> Celebration</span>
                </h1>

                <p className="events-intro">
                    Whatever the occasion, we'll help you turn your
                    vision into a beautifully planned event.
                </p>
            </section>


            {/* EVENT CARDS */}
            <section className="events-section">

                <div className="events-heading">
                    <h2>What are you planning?</h2>

                    <p>
                        Select an event and let's start creating
                        something unforgettable.
                    </p>
                </div>


                <div className="events-grid">

                    {events.map((event) => (
                        <div className="event-card" key={event.id}>

                            <div className="event-image-wrapper">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                />

                                <div className="event-icon">
                                    {event.icon}
                                </div>
                            </div>


                            <div className="event-card-content">

                                <h3>{event.title}</h3>

                                <p>
                                    {event.description}
                                </p>

                                <Link
                                    to={`/events/${event.id}`}
                                    className="event-explore-btn"
                                >
                                    Explore Event
                                    <span>→</span>
                                </Link>

                            </div>

                        </div>
                    ))}

                </div>

            </section>


            {/* BOTTOM CTA */}
            <section className="events-cta">

                <div>
                    <p>YOUR EVENT, YOUR WAY</p>

                    <h2>
                        Ready to create
                        <span> something special?</span>
                    </h2>

                    <p>
                        Choose your event and let Eventify take
                        care of the details.
                    </p>
                </div>

                <Link
                    to="/events"
                    className="events-cta-btn"
                >
                    Start Planning
                    <span>→</span>
                </Link>

            </section>

        </div>
    );
}

export default Events;