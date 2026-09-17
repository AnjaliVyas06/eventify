import "../App.css";
import { Link } from "react-router-dom";

import wedding from "../assets/wedding.jpg";
import birthday from "../assets/birthday.jpg";
import eng from "../assets/eng.jpg";
import house from "../assets/house.jpg";

import wedding2 from "../assets/wedding2.jpg";
import birthday2 from "../assets/birthday2.jpg";
import eng2 from "../assets/eng2.jpg";
import house2 from "../assets/house2.jpg";

function Home() {
  return (
    <div className="home">
      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">
        <div className="logo">
          <span>✦</span> Eventify
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/events">Events</Link>
        </nav>

        <Link to="/events" className="nav-btn">
          Book an Event
        </Link>
      </header>

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">
        <div className="hero-content">
          <p className="tagline">YOUR EVENT. YOUR MOMENT.</p>

          <h1>
            Moments made
            <span> unforgettable.</span>
          </h1>

          <p className="hero-description">
            From beautiful weddings to unforgettable birthdays, we help you
            plan, customize and celebrate your special moments your way.
          </p>

          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">
    Explore Events
    <span>→</span>
</Link>

<Link to="/about" className="secondary-btn">
    Learn More
</Link>
          </div>
        </div>

        {/* Hero Image Slider */}

        <div className="hero-image">
          <div className="image-slider">
            <img src={wedding2} alt="Wedding event" />

            <img src={birthday2} alt="Birthday event" />

            <img src={eng2} alt="Engagement event" />

            <img src={house2} alt="Housewarming event" />
          </div>

          {/* Small Information Card */}

          <div className="image-card">
            <span className="card-icon">✦</span>

            <div>
              <strong>Make it yours</strong>

              <p>Customize your perfect event</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          STATS
      ========================= */}

      <section className="stats">
        <div>
          <h2>500+</h2>
          <p>Events Planned</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Event Services</p>
        </div>

        <div>
          <h2>4.9</h2>
          <p>Customer Rating</p>
        </div>

        <div>
          <h2>100%</h2>
          <p>Personalized</p>
        </div>
      </section>

      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="categories">
        <div className="section-heading">
          <div>
            <p className="section-tag">EXPLORE OUR EVENTS</p>

            <h2>
              Celebrate every
              <span> occasion.</span>
            </h2>
          </div>

          <p className="section-description">
            Choose your occasion and let us help you create a celebration that
            feels completely yours.
          </p>
        </div>

        <div className="category-grid">
          {/* Wedding */}

          <div className="category-card">
            <img src={wedding} alt="Wedding event" />

            <div className="category-overlay">
              <p>01</p>

              <h3>Wedding</h3>

              <Link to="/events/wedding" className="card-explore">
              <span>Explore →</span>
              </Link>

            </div>
          </div>

          {/* Birthday */}

          <div className="category-card">
            <img src={birthday} alt="Birthday event" />

            <div className="category-overlay">
              <p>02</p>

              <h3>Birthday</h3>

              <Link to="/events/birthday" className="card-explore">
              <span>Explore →</span>
              </Link>

            </div>
          </div>

          {/* Engagement */}

          <div className="category-card">
            <img src={eng} alt="Engagement event" />

            <div className="category-overlay">
              <p>03</p>

              <h3>Engagement</h3>

              <Link to="/events/engagement" className="card-explore">
              <span>Explore →</span>
              </Link>

            </div>
          </div>

          {/* Housewarming */}

          <div className="category-card">
            <img src={house} alt="Housewarming event" />

            <div className="category-overlay">
              <p>04</p>

              <h3>Housewarming</h3>
              
              <Link to="/events/housewarming" className="card-explore">
              <span>Explore →</span>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="why-us">
        <div className="why-content">
          <p className="section-tag">WHY EVENTIFY</p>

          <h2>
            We make planning
            <span> feel effortless.</span>
          </h2>

          <p>
            From choosing your event to customizing every little detail,
            Eventify helps you create a celebration that feels truly yours.
          </p>
        </div>

        <div className="why-cards">
          <div className="why-card">
            <span>✦</span>

            <h3>Personalized</h3>

            <p>
              Customize your event according to your own style and requirements.
            </p>
          </div>

          <div className="why-card">
            <span>✓</span>

            <h3>Easy Planning</h3>

            <p>
              Plan your special occasion through a simple and organized process.
            </p>
          </div>

          <div className="why-card">
            <span>♡</span>

            <h3>Made With Care</h3>

            <p>We focus on the details that make your celebration memorable.</p>
          </div>
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="how-it-works">
        <div className="how-heading">
          <p className="section-tag">SIMPLE PROCESS</p>

          <h2>
            Plan your event in
            <span> 3 steps.</span>
          </h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>

            <h3>Choose Your Event</h3>

            <p>
              Select from weddings, birthdays, engagements or housewarmings.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>

            <h3>Customize</h3>

            <p>Select the services and options that match your celebration.</p>
          </div>

          <div className="step">
            <div className="step-number">03</div>

            <h3>Book & Celebrate</h3>

            <p>
              Confirm your booking and get ready to enjoy your special moment.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          CALL TO ACTION
      ========================= */}

      <section className="cta">
        <div>
          <p className="section-tag">READY TO CELEBRATE?</p>

          <h2>
            Your perfect event
            <span> starts here.</span>
          </h2>

          <p>
            Tell us what you're celebrating and we'll help you make it
            unforgettable.
          </p>

          <Link to="/events" className="primary-btn">
    Book Your Event
    <span>→</span>
</Link>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">
        <div className="footer-logo">
          <span>✦</span> Eventify
        </div>

        <p>Plan. Customize. Celebrate.</p>

        <div className="footer-links">
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/services">Services</Link>

          <Link to="/events">Events</Link>
        </div>

        <p className="copyright">© 2026 Eventify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
