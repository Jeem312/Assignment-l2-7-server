import express from "express";
const router = express.Router();
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "./blog.controller";
import { checkAuth } from "../../../middleWares/checkAuth";


router.post("/", checkAuth("admin"), createBlog);
router.get("/", getAllBlogs);
router.patch("/:id", checkAuth("admin"), updateBlog);
router.delete("/:id", checkAuth("admin"), deleteBlog);
export const BlogRoutes = router;
