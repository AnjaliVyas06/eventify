import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { clearSession, getTokenExpiration, isTokenExpired } from "../lib/authSession";

function ProtectedRoute({ role, children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("eventifyToken");
    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("eventifyUser") || "null");
        } catch {
            return null;
        }
    })();

    const hasValidSession = Boolean(token && user && !isTokenExpired(token));

    useEffect(() => {
        if (!hasValidSession) return undefined;

        const expiresAt = getTokenExpiration(token);
        const timeout = window.setTimeout(() => {
            clearSession();
            navigate("/auth", { replace: true });
        }, Math.max(0, expiresAt - Date.now()));

        return () => window.clearTimeout(timeout);
    }, [hasValidSession, navigate, token]);

    if (!hasValidSession) {
        clearSession();
        return <Navigate to="/auth" replace />;
    }
    if (role && user.role !== role) {
        return <Navigate to={user.role === "admin" ? "/admin-profile" : "/customer-profile"} replace />;
    }

    return children;
}

export default ProtectedRoute;