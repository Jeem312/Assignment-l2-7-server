import { Request, Response } from "express";
import * as BlogService from "./blog.service";
import { SendResponse as sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";
export const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.createBlog(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Blog created", data: blog });
});

export const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogService.getAllBlogs();
  sendResponse(res, { statusCode: 200, success: true, message: "Blogs fetched", data: blogs });
});

export const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.updateBlog(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Blog updated", data: blog });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await BlogService.deleteBlog(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Blog deleted", data: null });
});
