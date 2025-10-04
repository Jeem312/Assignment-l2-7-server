import Blog from "./blog.model";
import { IBlog } from "./blog.interface";

export const createBlog = async (data: IBlog) =>{
    const blog = Blog.create(data);
    return blog;
};
export const getAllBlogs = async () =>{
    const blogs = await Blog.find();
    return blogs;
}
export const updateBlog = async (id: string, data: Partial<IBlog>) => {
    const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
    return blog;
};
export const deleteBlog = async (id: string) => {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
};
