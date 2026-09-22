import { Router } from "express";
import {
    getCurrentUser,
    loginUser,
    registerUser,
} from "../controllers/authController.js";

import verifyJWT from "../middleware/authMiddleware.js";



const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJWT, getCurrentUser);

export default router;
