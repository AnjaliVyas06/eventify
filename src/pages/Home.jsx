import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import wedding from "../assets/wedding.jpg";
import birthday from "../assets/birthday.jpg";
import eng from "../assets/eng.jpg";
import house from "../assets/house.jpg";

import wedding2 from "../assets/wedding2.jpg";
import birthday2 from "../assets/birthday2.jpg";
import eng2 from "../assets/eng2.jpg";
import house2 from "../assets/house2.jpg";

import hero1 from "../assets/hero1.jpg";
import hero3 from "../assets/hero3.jpg";
import hero5 from "../assets/hero5.jpg";

function Home() {
  const heroImages = [wedding2, birthday, eng2, house2, hero1, hero3, hero5];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-[#08060d] text-white">
      {/* NAVBAR */}
      <header className="h-20 px-[7%] flex items-center justify-between border-b border-[#211d29]">
        <div className="text-[22px] font-bold">
          <span className="mr-[5px] text-[#9d4edd]">✦</span>
          Eventify
        </div>

        <nav className="hidden md:flex gap-[35px]">
          <Link
            className="text-sm text-[#c8c4ce] hover:text-white transition"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-sm text-[#c8c4ce] hover:text-white transition"
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-sm text-[#c8c4ce] hover:text-white transition"
            to="/services"
          >
            Services
          </Link>
          <Link
            className="text-sm text-[#c8c4ce] hover:text-white transition"
            to="/events"
          >
            Events
          </Link>
        </nav>

        {/* <Link
          to="/events"
          className="rounded-full border border-[#8d3cff] bg-transparent px-[22px] py-[11px] text-white no-underline transition hover:bg-[#8d3cff]"
        >
          Book an Event
        </Link> */}
        <div className="flex items-center">
          <Link
            to="/auth"
            className="rounded-[10px] border border-[#7c3aed] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7c3aed]"
          >
            Login / Sign Up
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-[620px] px-[7%] py-20 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-[70px] items-center">
        <div className="max-w-[650px]">
          <p className="mb-5 text-xs font-bold tracking-[2px] text-[#a855f7]">
            YOUR EVENT. YOUR MOMENT.
          </p>

          <h1 className="mb-[30px] text-[55px] leading-[0.98] tracking-[-3px] sm:text-[65px] lg:text-[85px]">
            Moments made
            <span className="text-[#a855f7]"> unforgettable.</span>
          </h1>

          <p className="mb-[35px] max-w-[500px] leading-[1.7] text-[#aaa5b2]">
            From beautiful weddings to unforgettable birthdays, we help you
            plan, customize and celebrate your special moments your way.
          </p>

          <div className="flex gap-[15px]">
            <Link
              to="/events"
              className="rounded-full bg-[#8d3cff] px-[22px] py-[14px] font-bold text-white no-underline transition hover:-translate-y-0.5"
            >
              Explore Events <span className="ml-2.5">→</span>
            </Link>

            <Link
              to="/about"
              className="rounded-full border border-[#38333f] bg-transparent px-[22px] py-[14px] text-white no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* HERO SLIDER */}
        <div className="relative h-[500px] overflow-hidden rounded-[25px] border border-[#513078] shadow-[0_0_30px_rgba(141,60,255,0.18)]">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Event"
                className="h-full min-w-full shrink-0 object-cover"
              />
            ))}
          </div>

          <div className="absolute bottom-[30px] left-5 z-10 flex items-center gap-3 rounded-[15px] border border-[#342d3d] bg-[rgba(20,16,27,0.95)] px-5 py-[15px]">
            <span className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#8d3cff]">
              ✦
            </span>

            <div>
              <strong className="text-sm">Make it yours</strong>
              <p className="mt-1 text-[11px] text-[#aaa5b2]">
                Customize your perfect event
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 border-y border-[#211d29] px-[7%] py-[30px] lg:grid-cols-4">
        {[
          ["500+", "Events Planned"],
          ["50+", "Event Services"],
          ["4.9", "Customer Rating"],
          ["100%", "Personalized"],
        ].map(([number, label], index) => (
          <div
            key={label}
            className={`p-5 text-center ${
              index !== 3 ? "border-r border-[#211d29]" : ""
            }`}
          >
            <h2 className="text-[28px]">{number}</h2>
            <p className="mt-[7px] text-xs text-[#8f8996]">{label}</p>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="bg-white px-[7%] py-[100px] text-[#111]">
        <div className="mb-[45px] flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] text-[#8d3cff]">
              EXPLORE OUR EVENTS
            </p>

            <h2 className="mt-3 text-[38px] leading-none lg:text-[48px]">
              Celebrate every
              <span className="text-[#8d3cff]"> occasion.</span>
            </h2>
          </div>

          <p className="max-w-[350px] leading-[1.6] text-[#666]">
            Choose your occasion and let us help you create a celebration that
            feels completely yours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
  {[
    [wedding, "01", "Wedding", "/events/wedding"],
    [birthday2, "02", "Birthday", "/events/birthday"],
    [eng, "03", "Engagement", "/events/engagement"],
    [house, "04", "Housewarming", "/events/housewarming"],
  ].map(([image, number, title, link]) => (
    <Link
      key={title}
      to={link}
      className="group relative h-[380px] overflow-hidden rounded-[20px] transition duration-500 hover:-translate-y-2"
    >
      <img
        src={image}
        alt={`${title} event`}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-[25px] text-white">
        <p className="text-xs text-[#c084fc]">{number}</p>

        <h3 className="my-[5px] text-[28px]">{title}</h3>

        <span className="text-[13px] text-white">
          Explore →
        </span>
      </div>
    </Link>
  ))}
</div>
      </section>

      {/* WHY EVENTIFY */}
      <section className="grid grid-cols-1 gap-10 bg-[#08060d] px-[7%] py-[100px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[11px] font-bold tracking-[2px] text-[#8d3cff]">
            WHY EVENTIFY
          </p>

          <h2 className="my-[15px] text-[38px] leading-[1.05] lg:text-[48px]">
            We make planning
            <span className="text-[#a855f7]"> feel effortless.</span>
          </h2>

          <p className="max-w-[450px] leading-[1.7] text-[#aaa5b2]">
            From choosing your event to customizing every little detail,
            Eventify helps you create a celebration that feels truly yours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[15px] md:grid-cols-3">
          {[
            [
              "✦",
              "Personalized",
              "Customize your event according to your own style and requirements.",
            ],
            [
              "✓",
              "Easy Planning",
              "Plan your special occasion through a simple and organized process.",
            ],
            [
              "♡",
              "Made With Care",
              "We focus on the details that make your celebration memorable.",
            ],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-[18px] border border-[#292330] bg-[#0d0a13] p-[25px] transition hover:-translate-y-1.5 hover:border-[#7c3aed]"
            >
              <span className="mb-[25px] flex h-10 w-10 items-center justify-center rounded-full bg-[#8d3cff]">
                {icon}
              </span>

              <h3 className="mb-3">{title}</h3>

              <p className="text-[13px] leading-[1.6] text-[#89838f]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-[7%] py-[100px] text-[#111]">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[2px] text-[#8d3cff]">
            SIMPLE PROCESS
          </p>

          <h2 className="mt-3 text-[38px] lg:text-[48px]">
            Plan your event in
            <span className="text-[#8d3cff]"> 3 steps.</span>
          </h2>
        </div>

        <div className="mt-[60px] grid grid-cols-1 gap-[30px] md:grid-cols-3">
          {[
            [
              "01",
              "Choose Your Event",
              "Select from weddings, birthdays, engagements or housewarmings.",
            ],
            [
              "02",
              "Customize",
              "Select the services and options that match your celebration.",
            ],
            [
              "03",
              "Book & Celebrate",
              "Confirm your booking and get ready to enjoy your special moment.",
            ],
          ].map(([number, title, text]) => (
            <div key={number} className="p-5 text-center">
              <div className="mx-auto mb-5 flex h-[55px] w-[55px] items-center justify-center rounded-full bg-[#8d3cff] text-[13px] font-bold text-white">
                {number}
              </div>

              <h3 className="mb-3">{title}</h3>

              <p className="text-sm leading-[1.6] text-[#666]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#120b1c] px-[7%] py-[100px] text-center">
        <p className="text-[11px] font-bold tracking-[2px] text-[#8d3cff]">
          READY TO CELEBRATE?
        </p>

        <h2 className="my-[15px] text-[38px] lg:text-[52px]">
          Your perfect event
          <span className="text-[#a855f7]"> starts here.</span>
        </h2>

        <p className="mb-[30px] text-[#aaa5b2]">
          Tell us what you're celebrating and we'll help you make it
          unforgettable.
        </p>

        <Link
          to="/events"
          className="inline-block rounded-full bg-[#8d3cff] px-[22px] py-[14px] font-bold text-white no-underline transition hover:-translate-y-0.5"
        >
          Book Your Event <span className="ml-2.5">→</span>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#292330] bg-[#05030a] px-[7%] py-[45px] text-center">
        <div className="text-[22px] font-bold">
          <span className="text-[#9d4edd]">✦</span> Eventify
        </div>

        <p className="mt-2.5 text-[13px] text-[#77717e]">
          Plan. Customize. Celebrate.
        </p>

        <div className="my-[25px] flex flex-wrap justify-center gap-[25px]">
          <Link
            className="text-[13px] text-[#aaa5b2] no-underline hover:text-[#a855f7]"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-[13px] text-[#aaa5b2] no-underline hover:text-[#a855f7]"
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-[13px] text-[#aaa5b2] no-underline hover:text-[#a855f7]"
            to="/services"
          >
            Services
          </Link>
          <Link
            className="text-[13px] text-[#aaa5b2] no-underline hover:text-[#a855f7]"
            to="/events"
          >
            Events
          </Link>
        </div>

        <p className="text-[11px] text-[#55505a]">
          © 2026 Eventify. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
