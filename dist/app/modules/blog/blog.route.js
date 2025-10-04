"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const blog_controller_1 = require("./blog.controller");
router.post("/", blog_controller_1.createBlog);
router.get("/", blog_controller_1.getAllBlogs);
router.patch("/:id", blog_controller_1.updateBlog);
router.delete("/:id", blog_controller_1.deleteBlog);
exports.BlogRoutes = router;
