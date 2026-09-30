import { Router } from "express";
import {
    getCurrentAdmin,
    loginAdmin,
    registerAdmin,
} from "../controllers/adminController.js";
import verifyJWT, { requireRole } from "../middleware/authMiddleware.js";
import {
    listAdminBookings,
    updateBookingStatus,
} from "../controllers/bookingController.js";
import {
    createCatalogItem,
    deactivateCatalogItem,
    addEventAvailability,
    listAdminCatalog,
    removeEventAvailability,
    publishEvent,
    unpublishEvent,
    updateCatalogItem,
} from "../controllers/adminCatalogController.js";

const router = Router();

router.post("/signup", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", verifyJWT, requireRole("admin"), getCurrentAdmin);
router.get("/bookings", verifyJWT, requireRole("admin"), listAdminBookings);
router.patch("/bookings/:id/status", verifyJWT, requireRole("admin"), updateBookingStatus);
router.get("/catalog/:type", verifyJWT, requireRole("admin"), listAdminCatalog);
router.post("/catalog/:type", verifyJWT, requireRole("admin"), createCatalogItem);
router.patch("/catalog/:type/:id", verifyJWT, requireRole("admin"), updateCatalogItem);
router.delete("/catalog/:type/:id", verifyJWT, requireRole("admin"), deactivateCatalogItem);
router.patch("/catalog/events/:id/publish", verifyJWT, requireRole("admin"), publishEvent);
router.patch("/catalog/events/:id/unpublish", verifyJWT, requireRole("admin"), unpublishEvent);
router.post("/catalog/events/:id/availability", verifyJWT, requireRole("admin"), addEventAvailability);
router.delete("/catalog/events/:id/availability/:availabilityId", verifyJWT, requireRole("admin"), removeEventAvailability);

export default router;