import bcrypt from "bcryptjs";
import User from "./user.model";
import { IUser } from "./user.interface";
import { envVars } from "../../../config/envConfig";

export const createUserService = async (userData: Partial<IUser>): Promise<IUser> => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const password = userData.password as string;
  const hashedPassword = await bcrypt.hash(password, envVars.BCRYPT_SALT_ROUNDS);

  const user =  User.create({
    ...userData,
    password: hashedPassword,
    role: userData.role || "user",
  });

  return user;
};
