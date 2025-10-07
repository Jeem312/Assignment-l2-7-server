import bcrypt from "bcryptjs";
import User from "../user/user.model";
import AppError from "../../../helpers/AppError";
import httpStatus from "http-status-codes";
import { generateToken } from "../../../utils/jwt";
import { envVars } from "../../../config/envConfig";

// Login Service
export const loginService = async (email: string, password: string) => {
  // Find user by email
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  // Compare password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  // Generate JWT tokens
const accessToken = generateToken(
  { userId: user._id, email: user.email, role: user.role },
  envVars.JWT_SECRET,
  envVars.JWT_ACCESS_EXPIRES // string like "9d"
);

const refreshToken = generateToken(
  { userId: user._id, email: user.email, role: user.role },
  envVars.JWT_REFRESH_SECRET,
  envVars.JWT_REFRESH_SECRET_EXPIRED 
);


  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

// Refresh Token Service
export const refreshTokenService = async (refreshToken: string) => {
  const jwt = await import("jsonwebtoken");
  
  try {
    const decoded = jwt.verify(refreshToken, envVars.JWT_REFRESH_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
    }

    // Generate new access token
    const newAccessToken = generateToken(
      { userId: user._id, email: user.email, role: user.role },
      envVars.JWT_SECRET,
      envVars.JWT_ACCESS_EXPIRES // string like "9d"
    );

    return { accessToken: newAccessToken };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }
};