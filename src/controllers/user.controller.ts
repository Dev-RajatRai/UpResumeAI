import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.model";
import generateToken from "../utils/generateToken";
import sendEmailVerification from "../utils/sendEmailVerification";
import sendPhoneOtp from "../utils/sendPhoneOtp";

// @desc    Register new user
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
    });

    const emailToken = await sendEmailVerification(email);
    const phoneOtp = await sendPhoneOtp(phone);

    newUser.verifyEmailToken = emailToken;
    newUser.verifyPhoneOtp = phoneOtp;
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id as string),
    });
  }
);

// @desc    Login user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    token: generateToken(user._id as string),
  });
});

// @desc    Get User Profile
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.user);
    
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json(user);
  }
);

// @desc    Update User Profile (name, phone, etc.)
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);
    if (!user) throw new Error("User not found");

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();
    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  }
);

// @desc    Verify Email
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const user = await User.findOne({ verifyEmailToken: token });
  if (!user) throw new Error("Invalid or expired token");

  user.isEmailVerified = true;
  user.verifyEmailToken = undefined;
  await user.save();

  res.json({ message: "Email verified successfully" });
});

// @desc    Verify Phone OTP
export const verifyPhone = asyncHandler(async (req: Request, res: Response) => {
  const { otp } = req.body;
  const user = await User.findOne({ verifyPhoneOtp: otp });
  if (!user) throw new Error("Invalid OTP");

  user.isPhoneVerified = true;
  user.verifyPhoneOtp = undefined;
  await user.save();

  res.json({ message: "Phone number verified successfully" });
});
