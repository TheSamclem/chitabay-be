import { Router } from "express";
import { signup, verifyOtpController } from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtpController);
export default router;
