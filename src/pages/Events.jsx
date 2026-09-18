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
        <div className="min-h-screen bg-[#09070d] text-white pb-[70px]">

            {/* HERO */}
            <section className="max-w-[850px] mx-auto px-5 pt-[110px] pb-[70px] text-center">
                <p className="text-[#a855f7] text-[13px] font-semibold tracking-[3px] mb-[18px]">
                    ✦ EVENTIFY EXPERIENCES
                </p>

                <h1 className="text-[42px] md:text-[58px] leading-[1.1] font-bold">
                    Choose Your
                    <span className="text-[#a855f7]"> Celebration</span>
                </h1>

                <p className="max-w-[650px] mx-auto mt-[25px] text-[#aaa] text-base md:text-[17px] leading-[1.7]">
                    Whatever the occasion, we'll help you turn your
                    vision into a beautifully planned event.
                </p>
            </section>


            {/* EVENT SECTION */}
            <section className="max-w-[1200px] mx-auto px-[30px] pt-[30px] pb-[80px]">

                <div className="mb-[40px]">
                    <h2 className="text-[32px] font-bold mb-[10px]">
                        What are you planning?
                    </h2>

                    <p className="text-[#999] text-[15px]">
                        Select an event and let's start creating
                        something unforgettable.
                    </p>
                </div>


                {/* EVENT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

                    {events.map((event) => (
                        <div
                            className="bg-[#111016] border border-[#24202b] rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#8b5cf6] hover:shadow-[0_20px_50px_rgba(139,92,246,0.18)]"
                            key={event.id}
                        >

                            {/* IMAGE */}
                            <div className="relative h-[270px] overflow-hidden">

                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.06]"
                                />

                                {/* ICON */}
                                <div className="absolute bottom-[18px] left-[20px] w-[52px] h-[52px] flex items-center justify-center bg-[rgba(15,12,20,0.88)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.12)] rounded-[14px] text-[24px]">
                                    {event.icon}
                                </div>

                            </div>


                            {/* CARD CONTENT */}
                            <div className="p-7">

                                <h3 className="text-[26px] font-bold mb-3">
                                    {event.title}
                                </h3>

                                <p className="text-[#999] leading-[1.7] text-sm mb-[25px]">
                                    {event.description}
                                </p>

                                <Link
                                    to={`/events/${event.id}`}
                                    className="inline-flex items-center gap-[10px] text-white no-underline text-sm font-semibold px-[18px] py-[11px] border border-[#7c3aed] rounded-[10px] transition-all duration-300 hover:bg-[#7c3aed] hover:translate-x-[3px]"
                                >
                                    Explore Event
                                    <span className="text-lg">→</span>
                                </Link>

                            </div>

                        </div>
                    ))}

                </div>

            </section>


            {/* BOTTOM CTA */}
            <section className="max-w-[1140px] mx-auto mx-[20px] md:mx-auto px-[35px] md:px-[50px] py-[35px] md:py-[45px] rounded-[22px] border border-[#292230] bg-gradient-to-br from-[#17121f] to-[#100c16] flex flex-col md:flex-row items-start md:items-center justify-between gap-[30px]">

                <div>

                    <p className="text-[#a855f7] text-xs tracking-[2px] font-semibold">
                        YOUR EVENT, YOUR WAY
                    </p>

                    <h2 className="text-[30px] font-bold my-[10px]">
                        Ready to create
                        <span className="text-[#a855f7]">
                            {" "}something special?
                        </span>
                    </h2>

                    <p className="text-[#999] m-0">
                        Choose your event and let Eventify take
                        care of the details.
                    </p>

                </div>


                <Link
                    to="/events"
                    className="inline-flex items-center gap-[10px] px-[23px] py-[14px] rounded-[10px] bg-[#7c3aed] text-white no-underline font-semibold transition-all duration-300 hover:bg-[#8b5cf6] hover:-translate-y-1 whitespace-nowrap"
                >
                    Start Planning
                    <span>→</span>
                </Link>

            </section>

        </div>
    );
}

export default Events;