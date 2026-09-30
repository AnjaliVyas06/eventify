import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
    const token = localStorage.getItem("eventifyToken");
    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("eventifyUser") || "null");
        } catch {
            return null;
        }
    })();

    if (!token || !user) return <Navigate to="/auth" replace />;
    if (role && user.role !== role) {
        return <Navigate to={user.role === "admin" ? "/admin-profile" : "/customer-profile"} replace />;
    }

    return children;
}

export default ProtectedRoute;