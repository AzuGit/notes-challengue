import { Router } from "express";
import {
  loginUser,
  createUser,
  logoutUser,
  getUser,
} from "../controller/user.controller.js";
import authToken from "../middleware/authToken.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//get user from token
router.get("/get-user", authToken, getUser);

export default router;
