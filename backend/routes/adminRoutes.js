import { Router } from "express";
import {
    getCurrentAdmin,
    loginAdmin,
    registerAdmin,
} from "../controllers/adminController.js";
import verifyJWT, { requireRole } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", verifyJWT, requireRole("admin"), getCurrentAdmin);

export default router;