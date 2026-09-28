import { Link } from "react-router-dom";

function AdminProfile() {
    return (
        <div className="min-h-screen bg-[#09070d] text-white">

            {/* ================= NAVBAR ================= */}
            <nav className="border-b border-[#24202b] bg-[#09070d]">
                <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">

                    <Link
                        to="/"
                        className="text-2xl font-bold text-white no-underline"
                    >
                        Event<span className="text-[#a855f7]">ify</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/events"
                            className="text-sm text-[#999] hover:text-white transition-colors no-underline"
                        >
                            Browse Events
                        </Link>

                        <div className="w-11 h-11 rounded-full bg-[#7c3aed] flex items-center justify-center text-lg font-bold">
                            A
                        </div>
                    </div>

                </div>
            </nav>


            {/* ================= MAIN ================= */}
            <main className="max-w-[1200px] mx-auto px-6 py-12">

                {/* HEADER */}
                <div className="mb-10">

                    <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-3">
                        ADMIN PROFILE
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Welcome back, Admin 👋
                    </h1>

                    <p className="text-[#999] mt-3">
                        Manage Eventify, events, bookings, venues and services from one place.
                    </p>

                </div>


                {/* ================= TOP SECTION ================= */}
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">


                    {/* ================= ADMIN CARD ================= */}
                    <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                        <div className="w-24 h-24 rounded-full bg-[#7c3aed] flex items-center justify-center text-4xl font-bold mx-auto mb-5">
                            A
                        </div>

                        <div className="text-center">

                            <h2 className="text-xl font-bold">
                                Admin Name
                            </h2>

                            <p className="text-[#888] text-sm mt-1">
                                admin@eventify.com
                            </p>

                            <div className="inline-flex mt-4 px-4 py-2 rounded-full bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#c084fc] text-sm font-semibold">
                                Administrator
                            </div>

                        </div>


                        {/* SIDEBAR */}
                        <div className="mt-8 space-y-2">

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 rounded-[10px] bg-[#7c3aed] text-white text-sm font-semibold"
                            >
                                Admin Profile
                            </button>

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 rounded-[10px] text-[#aaa] hover:bg-[#1a1620] hover:text-white text-sm transition"
                            >
                                Manage Events
                            </button>

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 rounded-[10px] text-[#aaa] hover:bg-[#1a1620] hover:text-white text-sm transition"
                            >
                                Manage Venues
                            </button>

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 rounded-[10px] text-[#aaa] hover:bg-[#1a1620] hover:text-white text-sm transition"
                            >
                                Manage Services
                            </button>

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 rounded-[10px] text-[#aaa] hover:bg-[#1a1620] hover:text-white text-sm transition"
                            >
                                Bookings
                            </button>

                        </div>

                    </div>


                    {/* ================= RIGHT SIDE ================= */}
                    <div className="space-y-6">


                        {/* PERSONAL INFORMATION */}
                        <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                            <h2 className="text-xl font-bold mb-6">
                                Admin Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        FULL NAME
                                    </p>

                                    <p className="text-white">
                                        Admin Name
                                    </p>
                                </div>


                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        EMAIL
                                    </p>

                                    <p className="text-white">
                                        admin@eventify.com
                                    </p>
                                </div>


                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        ACCOUNT TYPE
                                    </p>

                                    <p className="text-[#c084fc]">
                                        Administrator
                                    </p>
                                </div>


                                <div>
                                    <p className="text-[#777] text-xs mb-2">
                                        MEMBER SINCE
                                    </p>

                                    <p className="text-white">
                                        2026
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* ================= MANAGEMENT ================= */}
                        <div className="bg-[#111016] border border-[#292230] rounded-[20px] p-7">

                            <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-2">
                                EVENTIFY MANAGEMENT
                            </p>

                            <h2 className="text-xl font-bold mb-6">
                                Manage Your Platform
                            </h2>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                                {/* EVENTS */}
                                <div className="p-5 rounded-[15px] border border-[#292230] bg-[#0d0b12] hover:border-[#7c3aed] transition">

                                    <div className="w-11 h-11 rounded-[11px] bg-[#7c3aed]/15 flex items-center justify-center text-xl mb-4">
                                        🎉
                                    </div>

                                    <h3 className="text-lg font-bold mb-2">
                                        Events
                                    </h3>

                                    <p className="text-[#888] text-sm leading-[1.7]">
                                        Create, publish and manage Eventify events.
                                    </p>

                                </div>


                                {/* VENUES */}
                                <div className="p-5 rounded-[15px] border border-[#292230] bg-[#0d0b12] hover:border-[#7c3aed] transition">

                                    <div className="w-11 h-11 rounded-[11px] bg-[#7c3aed]/15 flex items-center justify-center text-xl mb-4">
                                        📍
                                    </div>

                                    <h3 className="text-lg font-bold mb-2">
                                        Venues
                                    </h3>

                                    <p className="text-[#888] text-sm leading-[1.7]">
                                        Add and manage venues available for events.
                                    </p>

                                </div>


                                {/* SERVICES */}
                                <div className="p-5 rounded-[15px] border border-[#292230] bg-[#0d0b12] hover:border-[#7c3aed] transition">

                                    <div className="w-11 h-11 rounded-[11px] bg-[#7c3aed]/15 flex items-center justify-center text-xl mb-4">
                                        🍽️
                                    </div>

                                    <h3 className="text-lg font-bold mb-2">
                                        Services
                                    </h3>

                                    <p className="text-[#888] text-sm leading-[1.7]">
                                        Manage catering, photography, decoration and more.
                                    </p>

                                </div>


                                {/* BOOKINGS */}
                                <div className="p-5 rounded-[15px] border border-[#292230] bg-[#0d0b12] hover:border-[#7c3aed] transition">

                                    <div className="w-11 h-11 rounded-[11px] bg-[#7c3aed]/15 flex items-center justify-center text-xl mb-4">
                                        📋
                                    </div>

                                    <h3 className="text-lg font-bold mb-2">
                                        Bookings
                                    </h3>

                                    <p className="text-[#888] text-sm leading-[1.7]">
                                        View and manage customer event bookings.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ================= QUICK STATS ================= */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            <div className="bg-[#111016] border border-[#292230] rounded-[15px] p-5">
                                <p className="text-[#777] text-xs mb-2">
                                    EVENTS
                                </p>

                                <p className="text-2xl font-bold">
                                    12
                                </p>
                            </div>


                            <div className="bg-[#111016] border border-[#292230] rounded-[15px] p-5">
                                <p className="text-[#777] text-xs mb-2">
                                    VENUES
                                </p>

                                <p className="text-2xl font-bold">
                                    18
                                </p>
                            </div>


                            <div className="bg-[#111016] border border-[#292230] rounded-[15px] p-5">
                                <p className="text-[#777] text-xs mb-2">
                                    SERVICES
                                </p>

                                <p className="text-2xl font-bold">
                                    24
                                </p>
                            </div>


                            <div className="bg-[#111016] border border-[#292230] rounded-[15px] p-5">
                                <p className="text-[#777] text-xs mb-2">
                                    BOOKINGS
                                </p>

                                <p className="text-2xl font-bold">
                                    36
                                </p>
                            </div>

                        </div>


                        {/* LOGOUT */}
                        <div className="flex justify-end pt-2">

                            <Link
                                to="/"
                                className="px-5 py-3 rounded-[10px] border border-[#3a303f] text-[#aaa] no-underline text-sm font-semibold hover:border-red-500 hover:text-red-400 transition"
                            >
                                Logout
                            </Link>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminProfile;