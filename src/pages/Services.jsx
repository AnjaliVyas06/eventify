import { Link } from "react-router-dom";

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
        <div className="min-h-screen bg-[#09070d] text-white pb-[70px]">

            {/* HERO */}
            <section className="max-w-[850px] mx-auto px-5 pt-[110px] pb-[80px] text-center">

                <p className="text-[#a855f7] text-xs font-semibold tracking-[3px]">
                    ✦ EVENTIFY SERVICES
                </p>

                <h1 className="text-[36px] sm:text-[44px] md:text-[58px] leading-[1.1] font-bold my-[18px]">
                    Everything Your Event
                    <span className="text-[#a855f7]"> Needs.</span>
                </h1>

                <p className="max-w-[680px] mx-auto text-[#999] text-base md:text-[17px] leading-[1.7]">
                    From venues and decorations to catering and
                    photography, Eventify brings the important
                    pieces of event planning together.
                </p>

            </section>


            {/* SERVICES */}
            <section className="max-w-[1150px] mx-auto px-[30px] pt-[20px] pb-[100px]">

                <div className="mb-[40px]">

                    <p className="text-[#a855f7] text-xs font-semibold tracking-[3px]">
                        OUR SERVICES
                    </p>

                    <h2 className="text-[32px] md:text-[38px] leading-[1.2] font-bold my-3">
                        Plan every detail,
                        <span className="text-[#a855f7]"> your way.</span>
                    </h2>

                    <p className="text-[#888]">
                        Choose what you need and create an event
                        that feels completely yours.
                    </p>

                </div>


                {/* SERVICE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {services.map((service) => (
                        <div
                            className="bg-[#111016] border border-[#24202b] rounded-[18px] p-[30px_25px] transition-all duration-300 hover:-translate-y-[7px] hover:border-[#7c3aed] hover:shadow-[0_20px_45px_rgba(124,58,237,0.13)]"
                            key={service.title}
                        >

                            <div className="w-[52px] h-[52px] flex items-center justify-center bg-[#1b1524] rounded-[13px] text-[24px] mb-[22px]">
                                {service.icon}
                            </div>

                            <h3 className="text-[19px] font-semibold mb-3">
                                {service.title}
                            </h3>

                            <p className="text-[#888] text-sm leading-[1.7] mb-[22px]">
                                {service.description}
                            </p>

                            <Link
                                to="/events"
                                className="inline-flex items-center gap-[9px] text-[#a855f7] no-underline text-sm font-semibold transition-all duration-300 hover:text-[#c084fc] hover:translate-x-1"
                            >
                                Explore
                                <span>→</span>
                            </Link>

                        </div>
                    ))}

                </div>

            </section>


            {/* HOW IT WORKS */}
            <section className="max-w-[1150px] mx-auto px-[30px] pt-[20px] pb-[100px]">

                <div className="mb-[40px]">

                    <p className="text-[#a855f7] text-xs font-semibold tracking-[3px]">
                        HOW IT WORKS
                    </p>

                    <h2 className="text-[32px] md:text-[38px] leading-[1.2] font-bold my-3">
                        From idea to
                        <span className="text-[#a855f7]"> celebration.</span>
                    </h2>

                </div>


                {/* PROCESS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">

                    <div className="p-[25px_20px] bg-[#0f0d13] border-t-2 border-[#7c3aed]">
                        <span className="text-[#a855f7] text-[13px] font-bold">
                            01
                        </span>

                        <h3 className="my-[15px] mb-[10px] text-[17px] font-semibold">
                            Choose Your Event
                        </h3>

                        <p className="text-[#888] text-[13px] leading-[1.7]">
                            Select Wedding, Birthday,
                            Engagement or Housewarming.
                        </p>
                    </div>


                    <div className="p-[25px_20px] bg-[#0f0d13] border-t-2 border-[#7c3aed]">
                        <span className="text-[#a855f7] text-[13px] font-bold">
                            02
                        </span>

                        <h3 className="my-[15px] mb-[10px] text-[17px] font-semibold">
                            Customize
                        </h3>

                        <p className="text-[#888] text-[13px] leading-[1.7]">
                            Select your venue, services,
                            theme and other requirements.
                        </p>
                    </div>


                    <div className="p-[25px_20px] bg-[#0f0d13] border-t-2 border-[#7c3aed]">
                        <span className="text-[#a855f7] text-[13px] font-bold">
                            03
                        </span>

                        <h3 className="my-[15px] mb-[10px] text-[17px] font-semibold">
                            Plan Your Budget
                        </h3>

                        <p className="text-[#888] text-[13px] leading-[1.7]">
                            Organize your choices while
                            keeping track of your event plan.
                        </p>
                    </div>


                    <div className="p-[25px_20px] bg-[#0f0d13] border-t-2 border-[#7c3aed]">
                        <span className="text-[#a855f7] text-[13px] font-bold">
                            04
                        </span>

                        <h3 className="my-[15px] mb-[10px] text-[17px] font-semibold">
                            Book Your Event
                        </h3>

                        <p className="text-[#888] text-[13px] leading-[1.7]">
                            Confirm your event and
                            get ready to celebrate.
                        </p>
                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="max-w-[1050px] mx-auto px-[35px] md:px-[50px] py-[35px] md:py-[45px] rounded-[22px] border border-[#292230] bg-gradient-to-br from-[#17121f] to-[#100c16] flex flex-col md:flex-row items-start md:items-center justify-between gap-[30px]">

                <div>

                    <p className="text-[#a855f7] text-xs font-semibold tracking-[3px]">
                        READY TO START?
                    </p>

                    <h2 className="text-[30px] font-bold my-[10px]">
                        Let's plan something
                        <span className="text-[#a855f7]">
                            {" "}unforgettable.
                        </span>
                    </h2>

                    <p className="text-[#888] m-0">
                        Choose your event and start building
                        your perfect celebration.
                    </p>

                </div>


                <Link
                    to="/events"
                    className="inline-flex items-center gap-[10px] px-[23px] py-[14px] bg-[#7c3aed] text-white no-underline rounded-[10px] font-semibold whitespace-nowrap transition-all duration-300 hover:bg-[#8b5cf6] hover:-translate-y-1"
                >
                    Start Planning
                    <span>→</span>
                </Link>

            </section>

        </div>
    );
}

export default Services;