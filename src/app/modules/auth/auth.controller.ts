import { Request, Response } from "express";

import { loginAdmin } from "./auth.service";
import { SendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginAdmin(email, password);
  SendResponse(res, { statusCode: 200, success: true, message: "Admin login successful", data: result });
});

export const AuthController = { login };
