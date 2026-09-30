import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = useState("Loading bookings...");

    const loadBookings = () => api.getBookings().then(({ bookings: records }) => {
        setBookings(records);
        setStatus(records.length ? "" : "You have no bookings yet.");
    });

    useEffect(() => {
        loadBookings().catch((error) => setStatus(error.message));
    }, []);

    const cancel = async (id) => {
        try {
            await api.cancelBooking(id);
            await loadBookings();
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#09070d] px-6 py-14 text-white">
            <div className="mx-auto max-w-[1000px]">
                <Link to="/customer-profile" className="text-sm text-[#aaa]">← Back to profile</Link>
                <h1 className="mt-8 text-4xl font-bold">My bookings</h1>
                {status && <p className="mt-8 text-[#c084fc]">{status}</p>}
                <div className="mt-8 space-y-4">
                    {bookings.map((booking) => (
                        <article key={booking._id} className="flex flex-col gap-4 rounded-[18px] border border-[#292230] bg-[#111016] p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-bold">{booking.eventType?.name || "Event"}</h2>
                                <p className="mt-2 text-sm text-[#999]">{new Date(booking.eventDate).toLocaleDateString()} · {booking.guestCount} guests</p>
                                <p className="mt-1 text-sm text-[#c084fc]">Estimated total: {booking.totalPrice}</p>
                                <p className="mt-1 text-sm text-[#999]">Payment: {booking.paymentStatus}</p>
                                <p className="mt-1 text-sm text-[#c084fc]">{booking.status}{booking.requiresDateApproval ? " · Custom date awaiting admin approval" : ""}</p>
                            </div>
                            {!['cancelled', 'completed'].includes(booking.status) && <button type="button" onClick={() => cancel(booking._id)} className="rounded-[10px] border border-red-500/50 px-4 py-2 text-sm text-red-300">Cancel</button>}
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default MyBookings;