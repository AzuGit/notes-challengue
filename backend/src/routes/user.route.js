import { Router } from "express";
import {
  loginUser,
  createUser,
  logoutUser,
} from "../controller/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
