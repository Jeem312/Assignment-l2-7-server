import express from "express";
import { createUserController } from "./user.controller";

const router = express.Router();

router.post("/", createUserController);

export const UserRoutes = router;