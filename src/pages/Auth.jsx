import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Auth() {
    const navigate = useNavigate();
    const [role, setRole] = useState("customer");
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        signupKey: "",
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((currentForm) => ({ ...currentForm, [name]: value }));
    };

    const submitForm = async (event) => {
        event.preventDefault();
        setStatus({ type: "", message: "" });
        setIsSubmitting(true);

        try {
            const endpoint = role === "admin"
                ? `/api/admin/auth/${isLogin ? "login" : "signup"}`
                : `/api/auth/${isLogin ? "login" : "signup"}`;
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    ...(role === "admin" && !isLogin
                        ? { signupKey: form.signupKey }
                        : {}),
                }),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to complete authentication");
            }

            localStorage.setItem("eventifyToken", result.data.token);
            localStorage.setItem("eventifyUser", JSON.stringify(result.data.user));
            navigate("/");
        } catch (error) {
            setStatus({ type: "error", message: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const switchMode = () => {
        setIsLogin((currentValue) => !currentValue);
        setRole("customer");
        setForm({ name: "", email: "", password: "", signupKey: "" });
        setStatus({ type: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-[#09070d] text-white flex items-center justify-center px-5 py-10">

            <div className="w-full max-w-137.5">

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
                    <div className="grid grid-cols-2 bg-[#0b0910] border border-[#24202b] rounded-xl p-1 mb-7">

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
                        onSubmit={submitForm}
                        className="space-y-5"
                    >

                        {/* NAME — SIGN UP ONLY */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-[#ddd] mb-2">
                                    Full Name
                                </label>

                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={updateField}
                                    required
                                    className="w-full px-4 py-3 rounded-[10px] bg-[#0b0910] border border-[#292230] text-white placeholder-[#666] outline-none transition-all duration-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                                />
                            </div>
                        )}

                        {!isLogin && role === "admin" && (
                            <div>
                                <label className="block text-sm font-medium text-[#ddd] mb-2">
                                    Admin Signup Key
                                </label>

                                <input
                                    name="signupKey"
                                    type="password"
                                    placeholder="Enter the admin signup key"
                                    value={form.signupKey}
                                    onChange={updateField}
                                    required
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
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={updateField}
                                required
                                className="w-full px-4 py-3 rounded-[10px] bg-[#0b0910] border border-[#292230] text-white placeholder-[#666] outline-none transition-all duration-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                            />
                        </div>


                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm font-medium text-[#ddd] mb-2">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={updateField}
                                minLength={8}
                                required
                                className="w-full px-4 py-3 rounded-[10px] bg-[#0b0910] border border-[#292230] text-white placeholder-[#666] outline-none transition-all duration-300 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                            />
                        </div>


                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 rounded-[10px] bg-[#7c3aed] text-white font-semibold transition-all duration-300 hover:bg-[#8b5cf6] hover:-translate-y-0.5"
                        >
                            {isSubmitting
                                ? "Please wait..."
                                : isLogin
                                ? `Login as ${role === "customer" ? "Customer" : "Admin"}`
                                : `Sign Up as ${role === "customer" ? "Customer" : "Admin"}`}
                        </button>

                        {status.message && (
                            <p className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-400"}`}>
                                {status.message}
                            </p>
                        )}

                    </form>


                    {/* SWITCH LOGIN / SIGNUP */}
                    <div className="text-center mt-7 pt-6 border-t border-[#24202b]">

                        {isLogin ? (
                            <p className="text-sm text-[#888]">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={switchMode}
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
                                    onClick={switchMode}
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