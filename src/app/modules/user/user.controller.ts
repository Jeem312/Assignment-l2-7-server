import { Request, Response } from "express";
import { SendResponse as sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";
import { createUserService } from "./user.service";

export const createUserController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const user = await createUserService(data);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});
