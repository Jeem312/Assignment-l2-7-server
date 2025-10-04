import express from "express";
import { createProject, deleteProject, getAllProjects, updateProject } from "./project.controller";

const router = express.Router();

router.post("/", createProject);     
router.get("/", getAllProjects);     
router.patch("/:id", updateProject); 
router.delete("/:id", deleteProject); 

export const ProjectRouter = router;
