import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

function Profile() {
    const navigate = useNavigate();
    const [user] = useState(() => JSON.parse(localStorage.getItem("eventifyUser") || "null"));
    const [bookingCount, setBookingCount] = useState(0);

    useEffect(() => {
        api.getBookings().then(({ bookings }) => setBookingCount(bookings.length)).catch(() => {});
    }, []);

    const logout = () => {
        localStorage.removeItem("eventifyToken");
        localStorage.removeItem("eventifyUser");
        navigate("/");
    };

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
                        to="/events"
                        className="text-sm text-[#999] hover:text-white transition-colors"
                    >
                        Browse Events
                    </Link>

                </div>
            </nav>


            {/* MAIN */}
            <main className="max-w-[1100px] mx-auto px-6 py-12">

                {/* HEADER */}
                <div className="mb-10">

                    <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-3">
                        CUSTOMER PROFILE
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Welcome back 👋
                    </h1>

                    <p className="text-[#999] mt-3">
                        Manage your profile and keep track of your events.
                    </p>

                </div>


                {/* PROFILE LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">

                    {/* LEFT PROFILE CARD */}
                    <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                        {/* AVATAR */}
                        <div className="w-24 h-24 rounded-full bg-[#7c3aed] flex items-center justify-center text-4xl font-bold mx-auto mb-5">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="text-center">

                            <h2 className="text-xl font-bold">
                                {user?.name || "Customer"}
                            </h2>

                            <p className="text-[#888] text-sm mt-1">
                                {user?.email || ""}
                            </p>

                        </div>


                        {/* PROFILE MENU */}
                        <div className="mt-8 space-y-2">

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 rounded-[10px] bg-[#7c3aed] text-white text-sm font-semibold"
                            >
                                My Profile
                            </button>

                            <Link
                                to="/my-bookings"
                                className="block px-4 py-3 rounded-[10px] text-[#aaa] hover:bg-[#1a1620] hover:text-white no-underline text-sm transition"
                            >
                                My Bookings
                            </Link>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* PERSONAL INFORMATION */}
                        <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                            <h2 className="text-xl font-bold mb-6">
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        FULL NAME
                                    </p>

                                    <p className="text-white">
                                        {user?.name || "Customer"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        EMAIL
                                    </p>

                                    <p className="text-white">
                                        {user?.email || ""}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        ACCOUNT TYPE
                                    </p>

                                    <p className="text-[#c084fc]">
                                        Customer
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        MEMBER SINCE
                                    </p>

                                    <p className="text-white">
                                        {user?.createdAt ? new Date(user.createdAt).getFullYear() : "-"}
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* MY BOOKINGS */}
                        <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                            <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-2">
                                YOUR EVENTS
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                                <div>

                                    <h2 className="text-xl font-bold">
                                        My Bookings
                                    </h2>

                                    <p className="text-[#888] text-sm mt-2">
                                        View and manage your upcoming event bookings.
                                    </p>

                                </div>

                                <Link
                                    to="/my-bookings"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-[9px] border border-[#7c3aed] text-white no-underline text-sm font-semibold hover:bg-[#7c3aed] transition"
                                >
                                        View {bookingCount} Bookings
                                </Link>

                            </div>

                        </div>


                        {/* LOGOUT */}
                        <div className="flex justify-end">

                            <button
                                type="button"
                                onClick={logout}
                                className="px-5 py-3 rounded-[10px] border border-[#3a303f] text-[#aaa] no-underline text-sm font-semibold hover:border-red-500 hover:text-red-400 transition"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Profile;