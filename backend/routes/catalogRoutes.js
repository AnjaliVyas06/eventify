import { Router } from "express";
import {
    getEventType,
    listEventTypes,
    listServices,
    listVenues,
} from "../controllers/catalogController.js";

const router = Router();

router.get("/events", listEventTypes);
router.get("/events/:slug", getEventType);
router.get("/services", listServices);
router.get("/venues", listVenues);

export default router;