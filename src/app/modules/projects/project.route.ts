import express from "express";
import { createProject, deleteProject, getAllProjects, singleProject, updateProject } from "./project.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validate } from "../../../utils/validation";
import { createProjectSchema, updateProjectSchema } from "./project.validation";

const router = express.Router();

router.post("/", checkAuth("admin"), validate(createProjectSchema), createProject);
router.get("/", getAllProjects);
router.patch("/:id", checkAuth("admin"), validate(updateProjectSchema), updateProject);
router.get("/:id", singleProject);
router.delete("/:id", checkAuth("admin"), deleteProject);

export const ProjectRouter = router;
