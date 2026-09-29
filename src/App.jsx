import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Auth from "./pages/Auth";
import CustomerProfile from "./pages/CustomerProfile";
import AdminProfile from "./pages/AdminProfile";

import CustomizeEvent from "./pages/CustomizeEvent";

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
        <Route path="/auth" element={<Auth />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
