import express from "express";
const router = express.Router();
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "./blog.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validate } from "../../../utils/validation";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";


router.post("/", checkAuth("admin"),validate(createBlogSchema), createBlog);
router.get("/", getAllBlogs);
router.patch("/:id", checkAuth("admin"), validate(updateBlogSchema), updateBlog);
router.delete("/:id", checkAuth("admin"), deleteBlog);
export const BlogRoutes = router;
