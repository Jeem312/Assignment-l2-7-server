import jwt, { SignOptions } from "jsonwebtoken";
import { envVars } from "../config/envConfig";

export const generateToken = (
  payload: object,
  secret: string,
  expiresIn: SignOptions["expiresIn"]
) => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, envVars.JWT_SECRET);
};
