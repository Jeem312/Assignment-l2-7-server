import User from "../app/modules/user/user.model";
import { envVars } from "../config/envConfig";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    // Check if super admin already exists
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("ℹ️  Super Admin already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUNDS)
    );

    // Create super admin payload with all required fields
    const payload = {
      name: "Shanjida Jahan Jeem", 
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin" as const, 
    };

    // Save super admin
    const admin = await User.create(payload);
    console.log("✅ Super Admin Created Successfully!");
    console.log("📧 Email:", admin.email);
    console.log("👤 Name:", admin.name);
    console.log("🔑 Role:", admin.role);
  } catch (error) {
    console.log("❌ Error seeding super admin:", error);
  }
};