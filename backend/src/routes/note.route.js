import { Router } from "express";
import authToken from "../middleware/authToken.js";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  archivedNotes,
} from "../controller/note.controller.js";

const router = Router();

// Apply authentication middleware to all note routes
router.use(authToken);

router.post("/add-note", createNote);
router.get("/all", getNotes);
router.put("/update/:noteId", updateNote);
router.delete("/delete/:noteId", deleteNote);
router.patch("/archive/:noteId", archivedNotes);

export default router;
