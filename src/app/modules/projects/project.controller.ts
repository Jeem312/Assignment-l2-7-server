import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { projectServices } from "./profect.service";
import { SendResponse } from "../../../utils/sendResponse";


export const createProject = catchAsync(async (req: Request, res: Response) => {
  const project = await projectServices.createProject(req.body);
  SendResponse(res, { statusCode: 201, success: true, message: "Project created", data: project });
});

export const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await projectServices.getAllProjects();
  SendResponse(res, { statusCode: 200, success: true, message: "Projects fetched", data: projects });
});

export const updateProject = catchAsync(async (req: Request, res: Response) => {
  const project = await projectServices.updateProject(req.params.id, req.body);
  SendResponse(res, { statusCode: 200, success: true, message: "Project updated", data: project });
});

export const deleteProject = catchAsync(async (req: Request, res: Response) => {
  await projectServices.deleteProject(req.params.id);
  SendResponse(res, { statusCode: 200, success: true, message: "Project deleted", data: null });
});
