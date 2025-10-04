import Project from "./project.model";
import { IProject } from "./project.interface";

 const createProject = async (data: IProject) => {
    const project = await Project.create(data);
    return project;
};

 const getAllProjects = async () => {
    const projects = await Project.find({});
    return projects;
};

 const updateProject = async (id: string, data: Partial<IProject>) => {
    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    return project;
};

 const deleteProject = async (id: string) => {
    await Project.findByIdAndDelete(id);
    return { message: "Project deleted successfully" };
};
export const projectServices = { createProject, getAllProjects, updateProject, deleteProject };