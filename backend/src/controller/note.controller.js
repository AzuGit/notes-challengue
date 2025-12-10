import Note from "../model/note.model.js";

// Create a new note

const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { userId } = req.user;

    // Validate required fields
    if (!title) {
      return res
        .status(400)
        .json({ error: true, message: "Title is required" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ error: true, message: "Content is required" });
    }

    // Create new note
    const newNote = new Note({
      title,
      content,
      userId: userId,
      tags: tags || [],
      archived: false,
    });

    // Save note to database
    const savedNote = await newNote.save();
    if (!savedNote) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to create note in database" });
    }
    // Respond with success
    res.status(201).json({
      message: "Note created successfully",
      note: savedNote,
      error: false,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ error: true, message: "Internal server error creating note" });
  }
};

// Get all notes for a user
const getNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    const notes = await Note.find({ userId });

    // Respond with notes
    res.status(200).json({ notes, error: false });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res
      .status(500)
      .json({ error: true, message: "Internal server error fetching notes" });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, archived } = req.body;
    const { userId } = req.user;

    // Validate required fields

    if (!title) {
      return res
        .status(400)
        .json({ error: true, message: "Title is required" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ error: true, message: "Content is required" });
    }

    // Find the note to update
    const note = await Note.findOne({ _id: id, userId: userId });

    if (!note) {
      return res
        .status(404)
        .json({ error: true, message: "Note not found or access denied" });
    }
    // Update note fields
    note.title = title;
    note.content = content;
    note.tags = tags || note.tags;
    note.archived = archived !== undefined ? archived : note.archived;

    // Save the updated note
    const updatedNote = await note.save();

    if (!updatedNote) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update note in database" });
    }

    // Respond with success
    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
      error: false,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ error: true, message: "Internal server error updating note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    // Find and delete the note
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    if (!deletedNote) {
      return res
        .status(404)
        .json({ error: true, message: "Note not found or access denied" });
    }
    // Respond with success
    res.status(200).json({
      message: "Note deleted successfully",
      note: deletedNote,
      error: false,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res
      .status(500)
      .json({ error: true, message: "Internal server error deleting note" });
  }
};

export { createNote, getNotes, updateNote, deleteNote };
