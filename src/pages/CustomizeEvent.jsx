import { Link, useParams } from "react-router-dom";

function Customize() {
    const { eventId } = useParams();

    const eventName =
        eventId?.charAt(0).toUpperCase() + eventId?.slice(1);

    return (
        <div className="min-h-screen bg-[#09070d] text-white">

            {/* NAVBAR */}
            <nav className="border-b border-[#24202b] bg-[#09070d]">
                <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">

                    <Link
                        to="/"
                        className="text-2xl font-bold text-white no-underline"
                    >
                        Event<span className="text-[#a855f7]">ify</span>
                    </Link>

                    <Link
                        to={`/events/${eventId}`}
                        className="text-sm text-[#999] hover:text-white transition no-underline"
                    >
                        ← Back to Event
                    </Link>

                </div>
            </nav>


            {/* MAIN */}
            <main className="max-w-[1100px] mx-auto px-6 py-14">

                {/* HEADER */}
                <section className="mb-10">

                    <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-3">
                        EVENTIFY CUSTOMIZATION
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Customize Your{" "}
                        <span className="text-[#a855f7]">
                            {eventName}
                        </span>
                    </h1>

                    <p className="text-[#999] mt-4 max-w-[700px]">
                        Personalize your event by choosing the theme,
                        decoration, colors and other details that match
                        your celebration.
                    </p>

                </section>


                {/* CUSTOMIZATION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    {/* THEME */}
                    <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                        <div className="w-12 h-12 rounded-[12px] bg-[#7c3aed]/15 flex items-center justify-center text-2xl mb-5">
                            🎨
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            Choose Your Theme
                        </h2>

                        <p className="text-[#999] text-sm mb-5">
                            Select a theme that matches the mood of
                            your celebration.
                        </p>

                        <select
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a theme
                            </option>
                            <option value="elegant">
                                Elegant
                            </option>
                            <option value="modern">
                                Modern
                            </option>
                            <option value="traditional">
                                Traditional
                            </option>
                            <option value="minimal">
                                Minimal
                            </option>
                            <option value="luxury">
                                Luxury
                            </option>
                        </select>

                    </div>


                    {/* DECORATION */}
                    <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                        <div className="w-12 h-12 rounded-[12px] bg-[#7c3aed]/15 flex items-center justify-center text-2xl mb-5">
                            ✨
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            Decoration Style
                        </h2>

                        <p className="text-[#999] text-sm mb-5">
                            Choose the decoration style you want for
                            your event.
                        </p>

                        <select
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select decoration
                            </option>
                            <option value="floral">
                                Floral
                            </option>
                            <option value="lights">
                                Lights &amp; Illumination
                            </option>
                            <option value="balloons">
                                Balloons
                            </option>
                            <option value="classic">
                                Classic
                            </option>
                            <option value="premium">
                                Premium
                            </option>
                        </select>

                    </div>


                    {/* COLORS */}
                    <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                        <div className="w-12 h-12 rounded-[12px] bg-[#7c3aed]/15 flex items-center justify-center text-2xl mb-5">
                            🌈
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            Event Colors
                        </h2>

                        <p className="text-[#999] text-sm mb-5">
                            Select the color style for your event.
                        </p>

                        <select
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select colors
                            </option>
                            <option value="purple">
                                Purple &amp; White
                            </option>
                            <option value="pink">
                                Pink &amp; Gold
                            </option>
                            <option value="blue">
                                Blue &amp; Silver
                            </option>
                            <option value="green">
                                Green &amp; Gold
                            </option>
                            <option value="neutral">
                                Neutral &amp; Beige
                            </option>
                        </select>

                    </div>


                    {/* GUESTS */}
                    <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                        <div className="w-12 h-12 rounded-[12px] bg-[#7c3aed]/15 flex items-center justify-center text-2xl mb-5">
                            👥
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            Number of Guests
                        </h2>

                        <p className="text-[#999] text-sm mb-5">
                            Tell us approximately how many guests
                            you are planning for.
                        </p>

                        <input
                            type="number"
                            min="1"
                            placeholder="Enter number of guests"
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
                        />

                    </div>

                </div>


                {/* BOTTOM ACTION */}
                <div className="mt-10 p-7 md:p-8 rounded-[20px] border border-[#292230] bg-gradient-to-br from-[#17121f] to-[#100c16] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                    <div>

                        <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-2">
                            NEXT STEP
                        </p>

                        <h2 className="text-2xl font-bold">
                            Ready to choose your venue?
                        </h2>

                        <p className="text-[#999] mt-2">
                            Continue planning your {eventName} event.
                        </p>

                    </div>

                    <Link
                        to={`/events/${eventId}/venue`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-[#7c3aed] text-white no-underline font-semibold hover:bg-[#8b5cf6] transition"
                    >
                        Find a Venue
                        <span>→</span>
                    </Link>

                </div>

            </main>

        </div>
    );
}

export default Customize;