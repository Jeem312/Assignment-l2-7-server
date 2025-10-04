import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  image: { type: String },
  thumbnail: { type: String },
  liveLink: { type: String },
}, { timestamps: true });

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
