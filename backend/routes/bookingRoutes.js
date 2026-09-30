import { Router } from "express";
import {
    cancelCustomerBooking,
    createBooking,
    getCustomerBooking,
    listCustomerBookings,
    simulatePayment,
} from "../controllers/bookingController.js";
import verifyJWT from "../middleware/authMiddleware.js";

const router = Router();

router.use(verifyJWT);
router.get("/", listCustomerBookings);
router.post("/", createBooking);
router.get("/:id", getCustomerBooking);
router.patch("/:id/cancel", cancelCustomerBooking);
router.patch("/:id/pay", simulatePayment);

export default router;