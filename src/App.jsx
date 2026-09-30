import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Auth from "./pages/Auth";
import CustomerProfile from "./pages/CustomerProfile";
import AdminProfile from "./pages/AdminProfile";

import CustomizeEvent from "./pages/CustomizeEvent";
import VenueSelection from "./pages/VenueSelection";
import EventServices from "./pages/EventServices";
import MyBookings from "./pages/MyBookings";
import AdminBookings from "./pages/AdminBookings";
import AdminCatalog from "./pages/AdminCatalog";
import AdminAvailability from "./pages/AdminAvailability";
import FakePayment from "./pages/FakePayment";
import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />

        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/events/:eventId/customize" element={<CustomizeEvent />} />
        <Route path="/events/:eventId/venue" element={<VenueSelection />} />
        <Route path="/events/:eventId/services" element={<EventServices />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/customer-profile" element={<ProtectedRoute role="customer"><CustomerProfile /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute role="customer"><MyBookings /></ProtectedRoute>} />
        <Route path="/payment/:bookingId" element={<ProtectedRoute role="customer"><FakePayment /></ProtectedRoute>} />
        <Route path="/admin-profile" element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><AdminBookings /></ProtectedRoute>} />
        <Route path="/admin/catalog" element={<ProtectedRoute role="admin"><AdminCatalog /></ProtectedRoute>} />
        <Route path="/admin/availability" element={<ProtectedRoute role="admin"><AdminAvailability /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
