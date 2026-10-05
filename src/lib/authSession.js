const TOKEN_KEY = "eventifyToken";
const USER_KEY = "eventifyUser";

const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

const getTokenExpiration = (token) => {
    if (!token || typeof token !== "string") return null;

    try {
        const payload = token.split(".")[1];
        if (!payload) return null;

        const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const paddedPayload = normalizedPayload.padEnd(
            normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
            "=",
        );
        const decodedPayload = JSON.parse(atob(paddedPayload));
        return typeof decodedPayload.exp === "number" ? decodedPayload.exp * 1000 : null;
    } catch {
        return null;
    }
};

const isTokenExpired = (token) => {
    const expiresAt = getTokenExpiration(token);
    return expiresAt === null || expiresAt <= Date.now();
};

export { clearSession, getTokenExpiration, isTokenExpired };
