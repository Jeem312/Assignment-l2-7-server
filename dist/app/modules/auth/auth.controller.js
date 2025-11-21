"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = exports.logoutController = exports.loginController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const envConfig_1 = require("../../../config/envConfig");
// Login Controller
exports.loginController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Email and password are required",
            data: null,
        });
    }
    const result = yield (0, auth_service_1.loginService)(email, password);
    // Set HTTP-only cookies
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: envConfig_1.envVars.NODE_ENV === "production",
        sameSite: envConfig_1.envVars.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: envConfig_1.envVars.NODE_ENV === "production",
        sameSite: envConfig_1.envVars.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });
}));
// Logout Controller
exports.logoutController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear cookies
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: envConfig_1.envVars.NODE_ENV === "production",
        sameSite: envConfig_1.envVars.NODE_ENV === "production" ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: envConfig_1.envVars.NODE_ENV === "production",
        sameSite: envConfig_1.envVars.NODE_ENV === "production" ? "none" : "lax",
    });
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Logout successful",
        data: null,
    });
}));
exports.refreshTokenController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 401,
            success: false,
            message: "Refresh token not found",
            data: null,
        });
    }
    const result = yield (0, auth_service_1.refreshTokenService)(refreshToken);
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: envConfig_1.envVars.NODE_ENV === "production",
        sameSite: envConfig_1.envVars.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
    });
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Token refreshed successfully",
        data: { accessToken: result.accessToken },
    });
}));
