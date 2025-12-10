import NavBar from "../../components/Navbar/NavBar";
import NoteCard from "../../components/Card/NoteCard";
import { IoMdAddCircle } from "react-icons/io";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";

function Home() {
  const [openEditModal, setopenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <NavBar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title={"meeting on 7th"}
            date={"3rf"}
            content={"meeting in 7 to conversation"}
            tags={"#meeting"}
            archive={true}
            onArchive={() => {}}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        </div>
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
          onclose={() => {
            setopenEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
}

export default Home;
