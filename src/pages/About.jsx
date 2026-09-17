import { Link } from "react-router-dom";
import "./About.css";

function About() {
    return (
        <div className="about-page">

            {/* HERO */}
            <section className="about-hero">
                <p className="about-tag">✦ ABOUT EVENTIFY</p>

                <h1>
                    We Turn Moments Into
                    <span> Memories.</span>
                </h1>

                <p>
                    Eventify is an event management platform designed
                    to make planning your special moments simple,
                    creative and stress-free.
                </p>
            </section>


            {/* ABOUT CONTENT */}
            <section className="about-intro">

                <div className="about-image">
                    <div className="about-image-box">
                        ✦
                    </div>
                </div>

                <div className="about-content">

                    <p className="section-tag">
                        OUR STORY
                    </p>

                    <h2>
                        Your celebration.
                        <br />
                        <span>Our planning.</span>
                    </h2>

                    <p>
                        Planning an event involves countless decisions,
                        from choosing the right venue to managing services,
                        budgets and every little detail in between.
                    </p>

                    <p>
                        Eventify brings these pieces together in one place,
                        helping you organize your celebration while keeping
                        the experience simple and enjoyable.
                    </p>

                    <Link to="/events" className="about-btn">
                        Start Planning
                        <span>→</span>
                    </Link>

                </div>

            </section>


            {/* WHAT WE DO */}
            <section className="about-features">

                <div className="about-section-heading">
                    <p className="section-tag">WHAT WE DO</p>

                    <h2>
                        Everything you need to
                        <span> plan beautifully.</span>
                    </h2>

                    <p>
                        From the first idea to the final celebration,
                        Eventify helps you stay organized.
                    </p>
                </div>


                <div className="about-feature-grid">

                    <div className="about-feature-card">
                        <div className="feature-icon">🎨</div>

                        <h3>Customize Your Event</h3>

                        <p>
                            Personalize your event according to
                            your style, preferences and requirements.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <div className="feature-icon">📍</div>

                        <h3>Find the Perfect Venue</h3>

                        <p>
                            Explore venue options that fit the
                            atmosphere and needs of your celebration.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <div className="feature-icon">🍽️</div>

                        <h3>Event Services</h3>

                        <p>
                            Organize important services such as
                            catering, decoration and photography.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <div className="feature-icon">💰</div>

                        <h3>Plan Your Budget</h3>

                        <p>
                            Keep your event planning organized
                            while staying aware of your budget.
                        </p>
                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="about-cta">

                <div>
                    <p className="section-tag">
                        MAKE IT MEMORABLE
                    </p>

                    <h2>
                        Your perfect event
                        <span> starts here.</span>
                    </h2>

                    <p>
                        Choose your celebration and let the planning begin.
                    </p>
                </div>

                <Link to="/events" className="about-cta-btn">
                    Book an Event
                    <span>→</span>
                </Link>

            </section>

        </div>
    );
}

export default About;