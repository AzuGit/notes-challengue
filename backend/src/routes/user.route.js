import { Router } from "express";
import { loginUser, createUser } from "../controller/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
