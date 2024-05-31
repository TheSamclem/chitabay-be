import { Request, Response } from "express";
import {
  checkIfUserExists,
  hashPassword,
  generateOTP,
  createUser,
  sendOtpToEmail,
  verifyOTP,
} from "../services/userService";
export const verifyOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await verifyOTP(email, otp);
    res.status(200).json({ message: "OTP verified successfully", user });
  } catch (error: any   ) {
    res.status(400).json({ message: error.message });
  }
};
export const signup = async (req: Request, res: Response) => {
  const { firstname, surname, username, email, phoneno, password } = req.body;

  try {
    // Check if the user already exists
    if (
      firstname == null ||
      surname == null ||
      username == null ||
      email == null ||
      phoneno == null ||
      password == null
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await checkIfUserExists(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await createUser({
      surname: surname,
      firstname: firstname,
      username: username,
      email: email,
      phoneno: phoneno,
      password: password,
      user_type: "bronze",
      status: "active",
      otp: otp,
    });

    // Send OTP to email
    await sendOtpToEmail(email, otp);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for the OTP.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
