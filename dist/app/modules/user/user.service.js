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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("./user.model"));
const envConfig_1 = require("../../../config/envConfig");
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate required fields
    if (!(userData === null || userData === void 0 ? void 0 : userData.email)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Email is required");
    }
    if (!(userData === null || userData === void 0 ? void 0 : userData.password)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Password is required");
    }
    if (!(userData === null || userData === void 0 ? void 0 : userData.name)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Name is required");
    }
    // Check if user already exists
    const existingUser = yield user_model_1.default.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Email already exists");
    }
    // Hash password
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, Number(envConfig_1.envVars.BCRYPT_SALT_ROUNDS));
    // Create user
    const user = yield user_model_1.default.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || "user",
    });
    return user;
});
exports.createUserService = createUserService;
