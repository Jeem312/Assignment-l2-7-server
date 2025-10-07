import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import { loginService, refreshTokenService } from "./auth.service";
import { envVars } from "../../../config/envConfig";

// Login Controller
export const loginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return SendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Email and password are required",
      data: null,
    });
  }

  const result = await loginService(email, password);

  // Set HTTP-only cookies
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

// Logout Controller
export const logoutController = catchAsync(async (req: Request, res: Response) => {
  // Clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
  });

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logout successful",
    data: null,
  });
});

export const refreshTokenController = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return SendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Refresh token not found",
      data: null,
    });
  }

  const result = await refreshTokenService(refreshToken);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000, 
  });

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token refreshed successfully",
    data: { accessToken: result.accessToken },
  });
});

