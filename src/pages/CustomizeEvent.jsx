import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";

function Customize() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ theme: "", decoration: "", colors: "", guestCount: "", eventDate: "", venue: "", services: [] });
    const [dateChoice, setDateChoice] = useState("custom");
    const [availableDates, setAvailableDates] = useState([]);
    const [venues, setVenues] = useState([]);
    const [services, setServices] = useState([]);
    const [eventPrice, setEventPrice] = useState(0);
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const eventName =
        eventId?.charAt(0).toUpperCase() + eventId?.slice(1);
    const isHousewarming = eventId === "housewarming";

    useEffect(() => {
        Promise.all([api.getVenues(), api.getServices(), api.getEvents()])
            .then(([venueData, serviceData, eventData]) => {
                setVenues(isHousewarming ? [] : venueData.venues);
                setServices(serviceData.services);
                const selectedEvent = eventData.events.find((item) => item.slug === eventId);
                const publishedDates = selectedEvent?.availability?.filter((slot) => slot.isPublished) || [];
                setEventPrice(selectedEvent?.customizationPrice || 0);
                setAvailableDates(publishedDates);
                if (publishedDates.length) {
                    const firstDate = new Date(publishedDates[0].date).toISOString().slice(0, 10);
                    setDateChoice(firstDate);
                    setForm((current) => ({ ...current, eventDate: firstDate }));
                }
            })
            .catch((error) => setStatus(error.message));
    }, [eventId, isHousewarming]);

    const updateField = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const selectDate = (event) => {
        const choice = event.target.value;
        setDateChoice(choice);
        setForm((current) => ({ ...current, eventDate: choice === "custom" ? "" : choice }));
    };

    const toggleService = (serviceId) => {
        setForm((current) => ({
            ...current,
            services: current.services.includes(serviceId)
                ? current.services.filter((id) => id !== serviceId)
                : [...current.services, serviceId],
        }));
    };

    const createDraft = async (event) => {
        event.preventDefault();
        setStatus("");
        setIsSubmitting(true);

        try {
            if (!localStorage.getItem("eventifyToken")) {
                navigate("/auth");
                return;
            }

            const { events } = await api.getEvents();
            const selectedEvent = events.find((item) => item.slug === eventId);
            if (!selectedEvent) throw new Error("This event type is not available yet");

            const { booking } = await api.createBooking({
                eventType: selectedEvent._id,
                eventDate: form.eventDate,
                guestCount: Number(form.guestCount),
                venue: isHousewarming ? undefined : form.venue || undefined,
                selectedServices: form.services.map((service) => ({ service, quantity: 1 })),
                customization: {
                    theme: form.theme,
                    colors: form.colors ? [form.colors] : [],
                    specialRequirements: form.decoration,
                },
            });
            navigate(`/payment/${booking._id}`);
        } catch (error) {
            setStatus(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedVenue = venues.find((venue) => venue._id === form.venue);
    const selectedServicesPrice = services
        .filter((service) => form.services.includes(service._id))
        .reduce((total, service) => total + (service.priceFrom || 0), 0);
    const estimatedTotal = eventPrice + (selectedVenue?.priceFrom || 0) + selectedServicesPrice;

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
                            name="theme"
                            value={form.theme}
                            onChange={updateField}
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
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
                            name="decoration"
                            value={form.decoration}
                            onChange={updateField}
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
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
                            name="colors"
                            value={form.colors}
                            onChange={updateField}
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
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
                            name="guestCount"
                            value={form.guestCount}
                            onChange={updateField}
                            type="number"
                            min="1"
                            placeholder="Enter number of guests"
                            className="w-full bg-[#0d0b12] border border-[#342c3c] rounded-[10px] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
                        />

                        <label className="mt-5 block text-sm text-[#aaa]">
                            Published event dates
                            <select value={dateChoice} onChange={selectDate} className="mt-2 w-full rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]">
                                {availableDates.map((slot) => {
                                    const date = new Date(slot.date).toISOString().slice(0, 10);
                                    return <option key={slot._id} value={date}>{date} · {slot.minGuests}-{slot.maxGuests} guests · {slot.minPrice}-{slot.maxPrice}</option>;
                                })}
                                <option value="custom">Custom date (requires admin approval)</option>
                            </select>
                        </label>

                        {dateChoice === "custom" && <label className="mt-5 block text-sm text-[#aaa]">
                            Custom event date
                            <input
                                name="eventDate"
                                type="date"
                                value={form.eventDate}
                                onChange={updateField}
                                min={new Date().toISOString().slice(0, 10)}
                                required
                                className="mt-2 w-full rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"
                            />
                            <span className="mt-2 block text-xs text-[#c084fc]">This booking will remain pending until an admin approves the date.</span>
                        </label>}

                    </div>

                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {!isHousewarming && <div className="rounded-[20px] border border-[#292230] bg-[#111016] p-7">
                        <h2 className="mb-3 text-xl font-bold">Choose a Venue</h2>
                        <p className="mb-5 text-sm text-[#999]">Select a venue that can accommodate your guests.</p>
                        <select name="venue" value={form.venue} onChange={updateField} className="w-full rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]">
                            <option value="">Select a venue</option>
                            {venues.map((venue) => <option key={venue._id} value={venue._id}>{venue.name} ({venue.capacity} guests)</option>)}
                        </select>
                    </div>}

                    <div className="rounded-[20px] border border-[#292230] bg-[#111016] p-7">
                        <h2 className="mb-3 text-xl font-bold">Choose Services</h2>
                        <p className="mb-5 text-sm text-[#999]">Add the services you need for your celebration.</p>
                        <div className="space-y-3">
                            {services.length === 0 && <p className="text-sm text-[#999]">No services are available yet.</p>}
                            {services.map((service) => <label key={service._id} className="flex items-center gap-3 text-sm text-[#ddd]">
                                <input type="checkbox" checked={form.services.includes(service._id)} onChange={() => toggleService(service._id)} className="h-4 w-4 accent-[#7c3aed]" />
                                <span>{service.name}{service.priceFrom !== undefined ? ` (from ${service.priceFrom})` : ""}</span>
                            </label>)}
                        </div>
                    </div>
                </div>


                {/* BOTTOM ACTION */}
                <form onSubmit={createDraft} className="mt-10 p-7 md:p-8 rounded-[20px] border border-[#292230] bg-gradient-to-br from-[#17121f] to-[#100c16] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

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
                        <p className="mt-4 text-sm text-[#c084fc]">
                            Estimated total: {estimatedTotal} (event {eventPrice} + venue {selectedVenue?.priceFrom || 0} + services {selectedServicesPrice})
                        </p>

                    </div>

                    <div className="flex flex-col items-start gap-3">
                        {status && <p className="text-sm text-red-300">{status}</p>}
                        <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-[10px] bg-[#7c3aed] px-6 py-3 font-semibold text-white transition hover:bg-[#8b5cf6] disabled:opacity-50">
                            {isSubmitting ? "Saving..." : "Save & continue"}
                            <span>→</span>
                        </button>
                        <Link to={`/events/${eventId}/venue`} className="text-sm text-[#c084fc]">Browse venues first</Link>
                    </div>

                </form>

            </main>

        </div>
    );
}

export default Customize;