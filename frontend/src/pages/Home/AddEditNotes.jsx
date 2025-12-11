import TagInput from "../../components/Input/TagInput";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../utils/axiosInstance";

function AddEditNotes({ onclose, noteData, type, setAllNotes }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/notes/add-note", {
        title,
        content,
        tags,
      });

      const notesResponse = await axiosInstance.get("/api/v1/notes/all");

      if (response.data && response.data.note && notesResponse.data.notes) {
        setAllNotes(notesResponse.data.notes);
        onclose();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/api/v1/notes/update/" + noteId,
        {
          title,
          content,
          tags,
        }
      );

      const notesResponse = await axiosInstance.get("/api/v1/notes/all");

      if (response.data && response.data.note && notesResponse.data.notes) {
        setAllNotes(notesResponse.data.notes);
        onclose();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };

  //check before add
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-orange-400"
        onClick={onclose}
      >
        <IoMdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="introduce title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-500 outline-none bg-slate-100 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error} </p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

export default AddEditNotes;
