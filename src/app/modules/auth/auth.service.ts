import bcrypt from "bcrypt";
import AppError from "../../../helpers/AppError";
import httpStatus from "http-status-codes";
import Admin from "./admin.model";

export const loginAdmin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");

  return { email: admin.email, message: "Admin login successful" };
};
