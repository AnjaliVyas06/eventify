const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
    const token = localStorage.getItem("eventifyToken");
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Request failed");
    return result.data;
};

export const api = {
    getEvents: () => request("/api/catalog/events"),
    getServices: (category = "") => request(`/api/catalog/services${category ? `?category=${category}` : ""}`),
    getVenues: (capacity = "") => request(`/api/catalog/venues${capacity ? `?capacity=${capacity}` : ""}`),
    createBooking: (booking) => request("/api/bookings", {
        method: "POST",
        body: JSON.stringify(booking),
    }),
    getBookings: () => request("/api/bookings"),
    getBooking: (id) => request(`/api/bookings/${id}`),
    simulatePayment: (id) => request(`/api/bookings/${id}/pay`, { method: "PATCH" }),
    cancelBooking: (id) => request(`/api/bookings/${id}/cancel`, { method: "PATCH" }),
    getAdminBookings: () => request("/api/admin/auth/bookings"),
    updateBookingStatus: (id, status) => request(`/api/admin/auth/bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    }),
    createCatalogItem: (type, item) => request(`/api/admin/auth/catalog/${type}`, {
        method: "POST",
        body: JSON.stringify(item),
    }),
    updateCatalogItem: (type, id, item) => request(`/api/admin/auth/catalog/${type}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
    }),
    deactivateCatalogItem: (type, id) => request(`/api/admin/auth/catalog/${type}/${id}`, { method: "DELETE" }),
    getAdminCatalog: (type) => request(`/api/admin/auth/catalog/${type}`),
    publishEvent: (id) => request(`/api/admin/auth/catalog/events/${id}/publish`, { method: "PATCH" }),
    unpublishEvent: (id) => request(`/api/admin/auth/catalog/events/${id}/unpublish`, { method: "PATCH" }),
    addEventAvailability: (id, slot) => request(`/api/admin/auth/catalog/events/${id}/availability`, {
        method: "POST",
        body: JSON.stringify(slot),
    }),
    removeEventAvailability: (id, availabilityId) => request(`/api/admin/auth/catalog/events/${id}/availability/${availabilityId}`, { method: "DELETE" }),
};