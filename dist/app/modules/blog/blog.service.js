"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getAllBlogs = exports.createBlog = void 0;
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlog = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = blog_model_1.default.create(data);
    return blog;
});
exports.createBlog = createBlog;
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_model_1.default.find();
    return blogs;
});
exports.getAllBlogs = getAllBlogs;
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findByIdAndUpdate(id, data, { new: true });
    return blog;
});
exports.updateBlog = updateBlog;
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findByIdAndDelete(id);
    return blog;
});
exports.deleteBlog = deleteBlog;
