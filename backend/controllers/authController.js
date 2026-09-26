import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create an access token for the logged-in user.
const generateAccessToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, "JWT_SECRET is missing from the environment");
  }

  return jwt.sign(
    { _id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );
};

// Remove private fields before sending a user to the frontend.
const getPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// Register a new customer.
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Get user data and validate required fields.
  if ([name, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters");
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Check whether the email is already registered.
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Hash the password before saving it in MongoDB.
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: "customer",
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  const accessToken = generateAccessToken(createdUser);

  return res.status(201).json({
    success: true,
    data: {
      user: getPublicUser(createdUser),
      token: accessToken,
    },
    message: "User registered successfully",
  });
});

// Log in an existing user.
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Get login data and validate required fields.
  if (!email?.trim() || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Select passwordHash because the User model hides it by default.
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+passwordHash",
  );

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.role !== "customer") {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "This account is inactive");
  }

  const accessToken = generateAccessToken(user);

  return res.status(200).json({
    success: true,
    data: {
      user: getPublicUser(user),
      token: accessToken,
    },
    message: "User logged in successfully",
  });
});

// Return the user loaded by the JWT middleware.
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    data: { user: getPublicUser(req.user) },
    message: "Current user fetched successfully",
  });
});

export { registerUser, loginUser, getCurrentUser };
