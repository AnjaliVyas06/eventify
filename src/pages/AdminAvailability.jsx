import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";

const emptyForm = { date: "", minGuests: "1", maxGuests: "100", minPrice: "0", maxPrice: "100000" };

function AdminAvailability() {
    const [searchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState(searchParams.get("event") || "");
    const [form, setForm] = useState(emptyForm);
    const [status, setStatus] = useState("Loading events...");
    const selectedEvent = events.find((event) => event._id === eventId);

    const loadEvents = () => api.getAdminCatalog("events").then(({ items }) => {
        setEvents(items);
        if (!eventId && items.length) setEventId(items[0]._id);
        setStatus(items.length ? "" : "No events have been created yet.");
    });

    useEffect(() => {
        api.getAdminCatalog("events")
            .then(({ items }) => {
                setEvents(items);
                if (!eventId && items.length) setEventId(items[0]._id);
                setStatus(items.length ? "" : "No events have been created yet.");
            })
            .catch((error) => setStatus(error.message));
    }, [eventId]);

    const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

    const addSlot = async (event) => {
        event.preventDefault();
        try {
            await api.addEventAvailability(eventId, {
                ...form,
                minGuests: Number(form.minGuests),
                maxGuests: Number(form.maxGuests),
                minPrice: Number(form.minPrice),
                maxPrice: Number(form.maxPrice),
            });
            setForm(emptyForm);
            await loadEvents();
        } catch (error) {
            setStatus(error.message);
        }
    };

    const removeSlot = async (availabilityId) => {
        try {
            await api.removeEventAvailability(eventId, availabilityId);
            await loadEvents();
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#09070d] px-6 py-12 text-white">
            <div className="mx-auto max-w-[1000px]">
                <Link to="/admin/catalog" className="text-sm text-[#aaa]">← Back to catalog</Link>
                <p className="mt-8 text-xs font-semibold tracking-[2px] text-[#a855f7]">EVENT AVAILABILITY</p>
                <h1 className="mt-3 text-4xl font-bold">Publish available dates</h1>
                <p className="mt-3 text-[#999]">Only dates published here are immediately bookable by customers.</p>

                <select value={eventId} onChange={(event) => setEventId(event.target.value)} className="mt-8 w-full rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]">
                    {events.map((event) => <option key={event._id} value={event._id}>{event.name}</option>)}
                </select>

                {selectedEvent && <>
                    <form onSubmit={addSlot} className="mt-6 rounded-[18px] border border-[#292230] bg-[#111016] p-6">
                        <h2 className="text-xl font-bold">Add date limits for {selectedEvent.name}</h2>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={updateField} className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                            <input name="minGuests" type="number" min="1" required value={form.minGuests} onChange={updateField} placeholder="Minimum guests" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                            <input name="maxGuests" type="number" min="1" required value={form.maxGuests} onChange={updateField} placeholder="Maximum guests" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                            <input name="minPrice" type="number" min="0" required value={form.minPrice} onChange={updateField} placeholder="Minimum price" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                            <input name="maxPrice" type="number" min="0" required value={form.maxPrice} onChange={updateField} placeholder="Maximum price" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                        </div>
                        <button type="submit" className="mt-5 rounded-[10px] bg-[#7c3aed] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8b5cf6]">Publish date</button>
                    </form>

                    {status && <p className="mt-6 text-[#c084fc]">{status}</p>}
                    <div className="mt-6 space-y-3">
                        {selectedEvent.availability?.map((slot) => <article key={slot._id} className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#292230] bg-[#111016] p-5 sm:flex-row sm:items-center"><div><p className="font-semibold">{new Date(slot.date).toLocaleDateString()}</p><p className="mt-1 text-sm text-[#999]">{slot.minGuests}-{slot.maxGuests} guests · {slot.minPrice}-{slot.maxPrice}</p></div><button type="button" onClick={() => removeSlot(slot._id)} className="rounded-[10px] border border-red-500/50 px-4 py-2 text-sm text-red-300">Remove date</button></article>)}
                    </div>
                </>}
            </div>
        </main>
    );
}

export default AdminAvailability;