import bcrypt from "bcryptjs";
import User from "./user.model";
import { IUser } from "./user.interface";
import { envVars } from "../../../config/envConfig";
import AppError from "../../../helpers/AppError";
import httpStatus from "http-status-codes";

export const createUserService = async (userData: Partial<IUser>): Promise<IUser> => {
  // Validate required fields
  if (!userData?.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  if (!userData?.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }

  if (!userData?.name) {
    throw new AppError(httpStatus.BAD_REQUEST, "Name is required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(envVars.BCRYPT_SALT_ROUNDS)
  );

  // Create user
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || "user",
  });

  return user;
};