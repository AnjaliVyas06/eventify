import { Link } from "react-router-dom";
import "./Services.css";

function Services() {
    const services = [
        {
            icon: "🎨",
            title: "Event Customization",
            description:
                "Personalize your celebration with themes, decorations, colors and experiences that match your vision."
        },
        {
            icon: "📍",
            title: "Venue Selection",
            description:
                "Find a venue that suits your event, guest count, style and overall celebration requirements."
        },
        {
            icon: "🍽️",
            title: "Catering & Food",
            description:
                "Plan food and catering options that make your celebration enjoyable for every guest."
        },
        {
            icon: "📸",
            title: "Photography",
            description:
                "Capture the important moments of your celebration so the memories stay with you."
        },
        {
            icon: "🌸",
            title: "Decoration",
            description:
                "Choose decoration ideas and themes that transform your venue into the atmosphere you imagined."
        },
        {
            icon: "💰",
            title: "Budget Planning",
            description:
                "Organize your event expenses and make planning easier while keeping your budget in mind."
        }
    ];

    return (
        <div className="services-page">

            {/* HERO */}
            <section className="services-hero">
                <p className="services-tag">✦ EVENTIFY SERVICES</p>

                <h1>
                    Everything Your Event
                    <span> Needs.</span>
                </h1>

                <p>
                    From venues and decorations to catering and
                    photography, Eventify brings the important
                    pieces of event planning together.
                </p>
            </section>


            {/* SERVICES */}
            <section className="services-section">

                <div className="services-heading">
                    <p className="section-tag">OUR SERVICES</p>

                    <h2>
                        Plan every detail,
                        <span> your way.</span>
                    </h2>

                    <p>
                        Choose what you need and create an event
                        that feels completely yours.
                    </p>
                </div>


                <div className="services-grid">

                    {services.map((service) => (
                        <div
                            className="service-card"
                            key={service.title}
                        >
                            <div className="service-icon">
                                {service.icon}
                            </div>

                            <h3>{service.title}</h3>

                            <p>{service.description}</p>

                            <Link
                                to="/events"
                                className="service-link"
                            >
                                Explore
                                <span>→</span>
                            </Link>
                        </div>
                    ))}

                </div>

            </section>


            {/* HOW IT WORKS */}
            <section className="services-process">

                <div className="services-heading">
                    <p className="section-tag">HOW IT WORKS</p>

                    <h2>
                        From idea to
                        <span> celebration.</span>
                    </h2>
                </div>


                <div className="process-grid">

                    <div className="process-step">
                        <span>01</span>
                        <h3>Choose Your Event</h3>
                        <p>
                            Select Wedding, Birthday,
                            Engagement or Housewarming.
                        </p>
                    </div>

                    <div className="process-step">
                        <span>02</span>
                        <h3>Customize</h3>
                        <p>
                            Select your venue, services,
                            theme and other requirements.
                        </p>
                    </div>

                    <div className="process-step">
                        <span>03</span>
                        <h3>Plan Your Budget</h3>
                        <p>
                            Organize your choices while
                            keeping track of your event plan.
                        </p>
                    </div>

                    <div className="process-step">
                        <span>04</span>
                        <h3>Book Your Event</h3>
                        <p>
                            Confirm your event and
                            get ready to celebrate.
                        </p>
                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="services-cta">

                <div>
                    <p className="section-tag">
                        READY TO START?
                    </p>

                    <h2>
                        Let's plan something
                        <span> unforgettable.</span>
                    </h2>

                    <p>
                        Choose your event and start building
                        your perfect celebration.
                    </p>
                </div>

                <Link
                    to="/events"
                    className="services-cta-btn"
                >
                    Start Planning
                    <span>→</span>
                </Link>

            </section>

        </div>
    );
}

export default Services;