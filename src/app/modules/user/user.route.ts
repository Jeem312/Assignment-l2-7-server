import express from "express";
import { createUserController } from "./user.controller";

const router = express.Router();

router.post("/register", createUserController);

export const UserRoutes = router;