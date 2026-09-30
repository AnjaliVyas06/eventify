import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";

function VenueSelection() {
    const { eventId } = useParams();
    const [venues, setVenues] = useState([]);
    const [status, setStatus] = useState("Loading venues...");

    useEffect(() => {
        api.getVenues()
            .then(({ venues: records }) => {
                setVenues(records);
                setStatus(records.length ? "" : "No venues are available yet.");
            })
            .catch((error) => setStatus(error.message));
    }, []);

    if (eventId === "housewarming") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#09070d] px-6 text-center text-white">
                <div>
                    <h1 className="text-3xl font-bold">Venue selection is not needed</h1>
                    <p className="mt-3 text-[#999]">Housewarming planning uses your own home as the celebration space.</p>
                    <Link to={`/events/${eventId}/customize`} className="mt-6 inline-flex rounded-[10px] bg-[#7c3aed] px-5 py-3 font-semibold text-white no-underline">Back to customization</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#09070d] px-6 py-14 text-white">
            <div className="mx-auto max-w-[1100px]">
                <Link to={`/events/${eventId}/customize`} className="text-sm text-[#aaa]">← Back to customization</Link>
                <h1 className="mt-8 text-4xl font-bold">Choose a venue</h1>
                <p className="mt-3 text-[#999]">Available venues are loaded from the Eventify catalog.</p>
                {status && <p className="mt-10 text-[#c084fc]">{status}</p>}
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {venues.map((venue) => (
                        <article key={venue._id} className="rounded-[18px] border border-[#292230] bg-[#111016] p-6">
                            <h2 className="text-xl font-bold">{venue.name}</h2>
                            <p className="mt-2 text-sm text-[#999]">{venue.description}</p>
                            <p className="mt-4 text-sm text-[#c084fc]">Capacity: {venue.capacity} guests</p>
                            <p className="mt-1 text-sm text-[#aaa]">{venue.address}</p>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default VenueSelection;