import { Router } from "express";
import authToken from "../utils/authToken.js";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controller/note.controller.js";

const router = Router();

router.use(authToken);

router.post("/add-note", createNote);
router.get("/all", getNotes);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

export default router;
