import User from "../app/modules/user/user.model";
import { envVars } from "../config/envConfig";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    // Check if super admin already exists
    const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });
    if (isSuperAdminExist) {
      console.log("Super Admin Already Exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUNDS));

    // Create super admin payload
    const payload = {
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
    };

    // Save super admin
    const Admin = await User.create(payload);
    console.log("Super Admin Created:", Admin.email);

  } catch (error) {
    console.log("Error seeding super admin:", error);
  }
};
