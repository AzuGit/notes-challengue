import NavBar from "../../components/Navbar/NavBar";
import NoteCard from "../../components/Card/NoteCard";
import { IoMdAddCircle } from "react-icons/io";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState, useMemo } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function Home() {
  const [openEditModal, setopenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [IsSearch, setIsSearch] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'archive

  //edit any note icon

  const handleEdit = (noteDetails) => {
    setopenEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // set notes and user info
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      console.log("loading", loading);
      try {
        const userResponse = await axiosInstance.get("/api/v1/users/get-user");

        if (isMounted && userResponse.data?.user) {
          setUserInfo(userResponse.data.user);
        }

        const notesResponse = await axiosInstance.get("/api/v1/notes/all");

        if (isMounted && notesResponse.data?.notes) {
          setAllNotes(notesResponse.data.notes);
        }
      } catch (error) {
        console.error("❌ Error:", error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  // Delete any note icon
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete(
        "/api/v1/notes/delete/" + noteId
      );

      const notesResponse = await axiosInstance.get("/api/v1/notes/all");

      if (response.data && !response.data.error && notesResponse.data.notes) {
        setAllNotes(notesResponse.data.notes);
        onclose();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  };

  //search notes on search bar for tags filter
  const searchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/api/v1/notes/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  };

  //save note icon
  const archiveNote = async (noteData) => {
    const noteId = noteData._id;
    const archived = noteData.archived;

    try {
      const response = await axiosInstance.patch(
        "/api/v1/notes/archive/" + noteId,
        {
          archived: !archived,
        }
      );

      console.log(response.data.note);

      const notesResponse = await axiosInstance.get("/api/v1/notes/all");

      if (response.data && response.data.note && notesResponse.data.notes) {
        setAllNotes(notesResponse.data.notes);
        onclose();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error Saving note");
      }
    }
  };

  const filteredNotes = useMemo(() => {
    switch (filter) {
      case "active":
        return allNotes.filter((note) => !note.archived);
      case "archive":
        return allNotes.filter((note) => note.archived);
      default: // 'all'
        return allNotes;
    }
  }, [allNotes, filter]);

  const handleActive = () => {
    setFilter("active");
  };

  const handleArchive = () => {
    setFilter("archive");
  };

  const handleShowAll = () => {
    setFilter("all");
  };

  return (
    <>
      <NavBar userInfo={userInfo} searchNotes={searchNotes} />

      <div className="flex gap-2 justify-center mt-6">
        <button
          onClick={handleActive}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Active
        </button>
        <button
          onClick={handleArchive}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Archive
        </button>

        <button
          onClick={handleShowAll}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          All
        </button>
      </div>

      <div className="container mx-auto">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={new Date(note.createdAt).toLocaleDateString()}
                content={note.content}
                tags={note.tags}
                archived={note.archived}
                onArchive={() => archiveNote(note)}
                onDelete={() => deleteNote(note)}
                onEdit={() => handleEdit(note)}
              />
            ))}
          </div>
        ) : (
          <h1>Add new note</h1>
        )}
      </div>

      <button
        className="w-24 h-24 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-orange-500 absolute right-10 bottom-10 "
        onClick={() => {
          setopenEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <IoMdAddCircle className="text-[40px] text-white" />
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={openEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openEditModal.type}
          noteData={openEditModal.data}
          setAllNotes={setAllNotes}
          onclose={() => {
            setopenEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
}

export default Home;
