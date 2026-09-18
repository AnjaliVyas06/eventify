import { useState } from "react";
import { Link } from "react-router-dom";

function Auth() {
    const [role, setRole] = useState("customer");
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-[#09070d] text-white flex items-center justify-center px-5 py-10">

            <div className="w-full max-w-[550px]">

                {/* LOGO / BRAND */}
                <div className="text-center mb-8">
                    <Link
                        to="/"
                        className="text-3xl font-bold text-white no-underline"
                    >
                        Event<span className="text-[#a855f7]">ify</span>
                    </Link>

                    <p className="text-[#888] text-sm mt-3">
                        {isLogin
                            ? "Welcome back! Let's continue planning."
                            : "Create your account and start planning."}
                    </p>
                </div>


                {/* AUTH CARD */}
                <div className="w-full bg-[#111016] border border-[#292230] rounded-[22px] p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.4)]">

                    {/* ROLE TABS */}
                    <div className="grid grid-cols-2 bg-[#0b0910] border border-[#24202b] rounded-[12px] p-1 mb-7">

                        <button
                            type="button"
                            onClick={() => setRole("customer")}
                            className={`py-3 rounded-[9px] text-sm font-semibold transition-all duration-300 ${
                                role === "customer"
                                    ? "bg-[#7c3aed] text-white"
                                    : "text-[#888] hover:text-white"
                            }`}
                        >
                            Customer
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("admin")}
                            className={`py-3 rounded-[9px] text-sm font-semibold transition-all duration-300 ${
                                role === "admin"
                                    ? "bg-[#7c3aed] text-white"
                                    : "text-[#888] hover:text-white"
                            }`}
                        >
                            Admin
                        </button>

                    </div>


                    {/* ROLE TITLE */}
                    <div className="mb-6">
                        <p className="text-[#a855f7] text-xs font-semibold tracking-[2px] mb-2">
                            {role === "customer"
                                ? "CUSTOMER ACCOUNT"
                                : "ADMIN ACCOUNT"}
                        </p>

                        <h1 className="text-2xl font-bold">
                            {isLogin ? "Login" : "Create Account"}
                        </h1>
                    </div>


                    {/* FORM */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5"
                    >

                        {/* NAME — SIGN UP ONLY */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-[#ddd] mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-[10px] bg-[#0b0910] border border-[#292230] text-white placeholder-[#666] outline-none transition-all duration-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                                />
                            </div>
                        )}


                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-medium text-[#ddd] mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-[10px] bg-[#0b0910] border border-[#292230] text-white placeholder-[#666] outline-none transition-all duration-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                            />
                        </div>


                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm font-medium text-[#ddd] mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-[10px] bg-[#0b0910] border border-[#292230] text-white placeholder-[#666] outline-none transition-all duration-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                            />
                        </div>


                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-[10px] bg-[#7c3aed] text-white font-semibold transition-all duration-300 hover:bg-[#8b5cf6] hover:-translate-y-0.5"
                        >
                            {isLogin
                                ? `Login as ${role === "customer" ? "Customer" : "Admin"}`
                                : `Sign Up as ${role === "customer" ? "Customer" : "Admin"}`}
                        </button>

                    </form>


                    {/* SWITCH LOGIN / SIGNUP */}
                    <div className="text-center mt-7 pt-6 border-t border-[#24202b]">

                        {isLogin ? (
                            <p className="text-sm text-[#888]">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-[#a855f7] font-semibold hover:text-[#c084fc]"
                                >
                                    Sign Up
                                </button>
                            </p>
                        ) : (
                            <p className="text-sm text-[#888]">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-[#a855f7] font-semibold hover:text-[#c084fc]"
                                >
                                    Login
                                </button>
                            </p>
                        )}

                    </div>

                </div>


                {/* BACK HOME */}
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-sm text-[#777] hover:text-white transition-colors"
                    >
                        ← Back to Eventify
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Auth;