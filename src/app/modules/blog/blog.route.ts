import express from "express";
const router = express.Router();
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "./blog.controller";
router.post("/", createBlog);
router.get("/", getAllBlogs);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);
export const BlogRoutes = router;
