import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { sendOTP } from "../utils/mailer";

export const checkIfUserExists = async (email: string) => {
  return await User.findOne({ where: { email } });
};
export const forgetPassword = async (email: string) => {
  // Find the user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  // Generate new OTP
  const newOTP = Math.floor(100000 + Math.random() * 900000);

  // Update user's OTP in the database
  user.otp = newOTP;
  await user.save();

  // Send the new OTP via email
  await sendOTP(email, newOTP);

  //   return { message: "OTP resent successfully" };

  return { message: "Password reset initiated. Please check your email." };
};
export const resetPassword = async (email: string, newPassword: string) => {
  // Find the user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate hash for the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password in the database
  user.password = hashedPassword;
  await user.save();

  return { message: "Password reset successfully" };
};
export const resendOTP = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate new OTP
  const newOTP = Math.floor(100000 + Math.random() * 900000);

  // Update user's OTP in the database
  user.otp = newOTP;
  await user.save();

  // Send the new OTP via email
  await sendOTP(email, newOTP);

  return { message: "OTP resent successfully" };
};
export const verifyOTP = async (email: string, otp: number) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  console.log(user.otp + "  " + otp);
  if (user.otp == null || user.otp == 0 || user.otp != otp) {
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
