import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    //userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
