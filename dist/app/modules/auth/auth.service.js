"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenService = exports.loginService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jwt_1 = require("../../../utils/jwt");
const envConfig_1 = require("../../../config/envConfig");
// Login Service
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    // Compare password
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    // Generate JWT tokens
    const accessToken = (0, jwt_1.generateToken)({ userId: user._id, email: user.email, role: user.role }, envConfig_1.envVars.JWT_SECRET, envConfig_1.envVars.JWT_ACCESS_EXPIRES // string like "9d"
    );
    const refreshToken = (0, jwt_1.generateToken)({ userId: user._id, email: user.email, role: user.role }, envConfig_1.envVars.JWT_REFRESH_SECRET, envConfig_1.envVars.JWT_REFRESH_SECRET_EXPIRED);
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
});
exports.loginService = loginService;
// Refresh Token Service
const refreshTokenService = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = yield Promise.resolve().then(() => __importStar(require("jsonwebtoken")));
    try {
        const decoded = jwt.verify(refreshToken, envConfig_1.envVars.JWT_REFRESH_SECRET);
        // Verify user still exists
        const user = yield user_model_1.default.findById(decoded.userId);
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "User not found");
        }
        // Generate new access token
        const newAccessToken = (0, jwt_1.generateToken)({ userId: user._id, email: user.email, role: user.role }, envConfig_1.envVars.JWT_SECRET, envConfig_1.envVars.JWT_ACCESS_EXPIRES // string like "9d"
        );
        return { accessToken: newAccessToken };
    }
    catch (error) {
        console.error("Error refreshing token:", error);
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Invalid refresh token");
    }
});
exports.refreshTokenService = refreshTokenService;
