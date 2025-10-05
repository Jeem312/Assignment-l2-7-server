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
exports.seedSuperAdmin = void 0;
const user_model_1 = __importDefault(require("../app/modules/user/user.model"));
const envConfig_1 = require("../config/envConfig");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if super admin already exists
        const isSuperAdminExist = yield user_model_1.default.findOne({
            email: envConfig_1.envVars.SUPER_ADMIN_EMAIL,
        });
        if (isSuperAdminExist) {
            console.log("ℹ️  Super Admin already exists");
            return;
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(envConfig_1.envVars.SUPER_ADMIN_PASSWORD, Number(envConfig_1.envVars.BCRYPT_SALT_ROUNDS));
        // Create super admin payload with all required fields
        const payload = {
            name: "Shanjida Jahan Jeem",
            email: envConfig_1.envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        };
        // Save super admin
        const admin = yield user_model_1.default.create(payload);
        console.log("✅ Super Admin Created Successfully!");
        console.log("📧 Email:", admin.email);
        console.log("👤 Name:", admin.name);
        console.log("🔑 Role:", admin.role);
    }
    catch (error) {
        console.log("❌ Error seeding super admin:", error);
    }
});
exports.seedSuperAdmin = seedSuperAdmin;
