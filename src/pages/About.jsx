import { Link } from "react-router-dom";

function About() {
    return (
        <div className="min-h-screen bg-[#09070d] text-white pb-[70px]">

            {/* HERO */}
            <section className="max-w-[850px] mx-auto px-5 pt-[110px] pb-[80px] text-center">
                <p className="text-[#9d4edd] text-xs font-semibold tracking-[3px] mb-5">
                    ✦ ABOUT EVENTIFY
                </p>

                <h1 className="text-[36px] sm:text-[44px] md:text-[58px] leading-[1.1] font-bold mb-6">
                    We Turn Moments Into
                    <span className="text-[#9d4edd]"> Memories.</span>
                </h1>

                <p className="text-[#999] text-base md:text-[17px] leading-[1.7] max-w-[750px] mx-auto">
                    Eventify is an event management platform designed
                    to make planning your special moments simple,
                    creative and stress-free.
                </p>
            </section>


            {/* ABOUT CONTENT */}
            <section className="max-w-[1150px] mx-auto px-[30px] pb-[100px] grid grid-cols-1 lg:grid-cols-2 gap-[50px] lg:gap-[80px] items-center">

                {/* IMAGE */}
                <div className="w-full">
                    <div className="w-full max-w-[430px] h-[300px] md:h-[430px] mx-auto rounded-[25px] border border-[#513078] bg-[radial-gradient(circle_at_center,#2a153d,#121017_60%)] shadow-[0_20px_60px_rgba(124,58,237,0.15)] flex items-center justify-center">
                        <span className="text-[#9d4edd] text-[70px] md:text-[100px]">
                            ✦
                        </span>
                    </div>
                </div>


                {/* CONTENT */}
                <div className="max-w-[550px]">
                    <p className="text-[#9d4edd] text-xs font-semibold tracking-[3px] mb-4">
                        OUR STORY
                    </p>

                    <h2 className="text-[34px] md:text-[42px] leading-[1.15] font-bold mb-6">
                        Your celebration.
                        <br />
                        <span className="text-[#9d4edd]">Our planning.</span>
                    </h2>

                    <p className="text-[#999] leading-[1.8] mb-5">
                        Planning an event involves countless decisions,
                        from choosing the right venue to managing services,
                        budgets and every little detail in between.
                    </p>

                    <p className="text-[#999] leading-[1.8] mb-8">
                        Eventify brings these pieces together in one place,
                        helping you organize your celebration while keeping
                        the experience simple and enjoyable.
                    </p>

                    <Link
                        to="/events"
                        className="inline-flex items-center gap-3 bg-[#7c3aed] text-white px-6 py-3 rounded-[10px] font-semibold transition-all duration-300 hover:bg-[#8b5cf6] hover:-translate-y-1"
                    >
                        Start Planning
                        <span>→</span>
                    </Link>
                </div>
            </section>


            {/* WHAT WE DO */}
            <section className="max-w-[1150px] mx-auto px-[30px] pb-[100px]">

                <div className="text-center max-w-[700px] mx-auto mb-[50px]">
                    <p className="text-[#9d4edd] text-xs font-semibold tracking-[3px] mb-4">
                        WHAT WE DO
                    </p>

                    <h2 className="text-[34px] md:text-[42px] leading-[1.15] font-bold mb-5">
                        Everything you need to
                        <span className="text-[#9d4edd]"> plan beautifully.</span>
                    </h2>

                    <p className="text-[#999] leading-[1.7]">
                        From the first idea to the final celebration,
                        Eventify helps you stay organized.
                    </p>
                </div>


                {/* FEATURE CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">

                    <div className="bg-[#111016] border border-[#24202b] rounded-[18px] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#513078] hover:shadow-[0_15px_40px_rgba(124,58,237,0.12)]">
                        <div className="text-[32px] mb-5">🎨</div>
                        <h3 className="text-lg font-semibold mb-3">
                            Customize Your Event
                        </h3>
                        <p className="text-[#999] leading-[1.7] text-sm">
                            Personalize your event according to
                            your style, preferences and requirements.
                        </p>
                    </div>


                    <div className="bg-[#111016] border border-[#24202b] rounded-[18px] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#513078] hover:shadow-[0_15px_40px_rgba(124,58,237,0.12)]">
                        <div className="text-[32px] mb-5">📍</div>
                        <h3 className="text-lg font-semibold mb-3">
                            Find the Perfect Venue
                        </h3>
                        <p className="text-[#999] leading-[1.7] text-sm">
                            Explore venue options that fit the
                            atmosphere and needs of your celebration.
                        </p>
                    </div>


                    <div className="bg-[#111016] border border-[#24202b] rounded-[18px] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#513078] hover:shadow-[0_15px_40px_rgba(124,58,237,0.12)]">
                        <div className="text-[32px] mb-5">🍽️</div>
                        <h3 className="text-lg font-semibold mb-3">
                            Event Services
                        </h3>
                        <p className="text-[#999] leading-[1.7] text-sm">
                            Organize important services such as
                            catering, decoration and photography.
                        </p>
                    </div>


                    <div className="bg-[#111016] border border-[#24202b] rounded-[18px] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#513078] hover:shadow-[0_15px_40px_rgba(124,58,237,0.12)]">
                        <div className="text-[32px] mb-5">💰</div>
                        <h3 className="text-lg font-semibold mb-3">
                            Plan Your Budget
                        </h3>
                        <p className="text-[#999] leading-[1.7] text-sm">
                            Keep your event planning organized
                            while staying aware of your budget.
                        </p>
                    </div>

                </div>
            </section>


            {/* CTA */}
            <section className="max-w-[1050px] mx-auto mx-[30px] px-[30px] md:px-[50px] py-[45px] rounded-[20px] border border-[#292333] bg-gradient-to-r from-[#17121f] to-[#100c16] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                <div>
                    <p className="text-[#9d4edd] text-xs font-semibold tracking-[3px] mb-4">
                        MAKE IT MEMORABLE
                    </p>

                    <h2 className="text-[30px] md:text-[38px] font-bold leading-[1.2] mb-3">
                        Your perfect event
                        <span className="text-[#9d4edd]"> starts here.</span>
                    </h2>

                    <p className="text-[#999] leading-[1.7]">
                        Choose your celebration and let the planning begin.
                    </p>
                </div>


                <Link
                    to="/events"
                    className="inline-flex items-center gap-3 bg-[#7c3aed] text-white px-6 py-3 rounded-[10px] font-semibold whitespace-nowrap transition-all duration-300 hover:bg-[#8b5cf6] hover:-translate-y-1"
                >
                    Book an Event
                    <span>→</span>
                </Link>

            </section>

        </div>
    );
}

export default About;