import express from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
} from "./auth.controller";

const router = express.Router();

// Public routes
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshTokenController);



export const AuthRoutes = router;