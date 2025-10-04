import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: String, default: "Admin" },
}, { timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
