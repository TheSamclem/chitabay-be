import { Router } from "express";
import {
  signup,
  verifyOtpController,
  resendOTPController,
  resetPasswordController,
  forgetPasswordController,
  signIn,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtpController);
router.post("/resend-otp", resendOTPController);
router.post("/reset-password", resetPasswordController);
router.post("/forget-password", forgetPasswordController);
router.post("/signin", signIn);
export default router;
