import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

const statuses = ["draft", "pending", "confirmed", "cancelled", "completed"];

function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = useState("Loading bookings...");

    const loadBookings = () => api.getAdminBookings().then(({ bookings: records }) => {
        setBookings(records);
        setStatus(records.length ? "" : "No customer bookings yet.");
    });

    useEffect(() => {
        loadBookings().catch((error) => setStatus(error.message));
    }, []);

    const changeStatus = async (id, nextStatus) => {
        try {
            await api.updateBookingStatus(id, nextStatus);
            await loadBookings();
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#09070d] px-6 py-12 text-white">
            <div className="mx-auto max-w-[1200px]">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <Link to="/admin-profile" className="text-sm text-[#aaa]">← Back to admin profile</Link>
                        <p className="mt-8 text-xs font-semibold tracking-[2px] text-[#a855f7]">EVENTIFY MANAGEMENT</p>
                        <h1 className="mt-3 text-4xl font-bold">Customer bookings</h1>
                    </div>
                    <Link to="/admin/catalog" className="rounded-[10px] border border-[#7c3aed] px-4 py-3 text-sm font-semibold text-white no-underline hover:bg-[#7c3aed]">Manage catalog</Link>
                </div>
                {status && <p className="mt-10 text-[#c084fc]">{status}</p>}
                <div className="mt-10 space-y-5">
                    {bookings.map((booking) => (
                        <article key={booking._id} className="rounded-[18px] border border-[#292230] bg-[#111016] p-6">
                            <div className="flex flex-col justify-between gap-5 lg:flex-row">
                                <div>
                                    <h2 className="text-xl font-bold">{booking.eventType?.name || "Event"}</h2>
                                    <p className="mt-2 text-sm text-[#c084fc]">Customer: {booking.customer?.name} · {booking.customer?.email}</p>
                                    <p className="mt-2 text-sm text-[#999]">{new Date(booking.eventDate).toLocaleDateString()} · {booking.guestCount} guests</p>
                                    <p className="mt-1 text-sm text-[#999]">Venue: {booking.venue?.name || "Not selected"}</p>
                                    <p className="mt-1 text-sm text-[#999]">Services: {booking.selectedServices?.map((item) => item.name).join(", ") || "None"}</p>
                                    <p className="mt-1 text-sm text-[#c084fc]">Total price: {booking.totalPrice}</p>
                                    {booking.requiresDateApproval && <p className="mt-1 text-sm text-amber-300">Custom date requires admin approval</p>}
                                </div>
                                <label className="flex min-w-[180px] flex-col gap-2 text-xs text-[#999]">
                                    BOOKING STATUS
                                    <select value={booking.status} onChange={(event) => changeStatus(booking._id, event.target.value)} className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-3 py-3 text-sm text-white outline-none focus:border-[#7c3aed]">
                                        {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                </label>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default AdminBookings;