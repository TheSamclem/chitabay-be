import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { sendOTP } from "../utils/mailer";

export const checkIfUserExists = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const verifyOTP = async (email: string, otp: number) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== null && user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  user.otp = 0;
  user.status = "verified";
  await user.save();

  return user;
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const createUser = async (userData: {
  firstname: string;
  surname: string;
  username: string;
  email: string;
  phoneno: string;
  password: string;
  user_type: string;
  status: string;
  otp: number;
}) => {
  return await User.create(userData);
};

export const sendOtpToEmail = async (email: string, otp: number) => {
  await sendOTP(email, otp);
};
