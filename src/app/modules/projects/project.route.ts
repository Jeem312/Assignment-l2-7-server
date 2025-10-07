import express from "express";
import { createProject, deleteProject, getAllProjects, singleProject, updateProject } from "./project.controller";
import { checkAuth } from "../../../middleWares/checkAuth";

const router = express.Router();

router.post("/", checkAuth("admin"), createProject);
router.get("/", getAllProjects);
router.patch("/:id", checkAuth("admin"), updateProject);
router.get("/:id", singleProject);
router.delete("/:id", checkAuth("admin"), deleteProject);

export const ProjectRouter = router;
