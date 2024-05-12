import { useContext, useEffect, useState } from "react";
import AddNoteForm from "./forms/AddNoteForm";
import { NotesContext, NotesContextType } from "../context/NotesProvider";
import NoteCard from "./NoteCard";
import EditNoteForm from "./forms/EditNoteForm";
import DeleteNoteConfirm from "./DeleteNoteConfirm";
import { NoteDeleteType, NoteType } from "../types/NoteType";



const Home = () => {
  const { notes, fetchUserNotes, loading, error } =
    useContext<NotesContextType>(NotesContext);

  //set note to be deleted
  const [noteToDelete, setNoteToDelete] = useState<NoteDeleteType>({id:0,email:""});

  //set note to be edited
  const [noteToEdit, setNoteToEdit] = useState<NoteType>({
    id: 0,
    email: "",
    title: "",
    desc: "",
  });

  //to darken background
  const [backgroundDark, setBackgroundDark] = useState(false);

  //to show or hide edit notes
  const [editModal, setEditModal] = useState(false);

  //to show or hide delete note confirmation
  const [deleteModal, setDeleteModal] = useState(false);

  //function to open delete confirmation modal
  const openDeleteNoteConfirm = (note:NoteDeleteType) => {
    setDeleteModal(true);
    setNoteToDelete(note);
  };

  //function to open edit note
  const openEditNote = (note: NoteType) => {
    setEditModal(true);
    //console.log(note);
    setNoteToEdit(note);
  };

  //to close all the modals
  const closeAllModals = () => {
    setEditModal(false);
    setDeleteModal(false);
    setBackgroundDark(false);
  };

  useEffect(() => {
    fetchUserNotes();
  }, []);

  if (loading) {
    return <div>Loading Notes...</div>;
  }

  if (error) {
    return <div>Oops! Something went wrong...🥲</div>;
  }

  return (
    <>
      <div className=" flex flex-col items-center">
        <div className="py-2 w-[80vw]">
          <AddNoteForm />
        </div>

        <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-[1.5vw]">
          {notes &&
            notes.map((note, i) => {
              return (
                <NoteCard
                  note={note}
                  key={i}
                  openEditNote={openEditNote}
                  openDeleteNoteConfirm={openDeleteNoteConfirm}
                />
              );
            })}
        </div>
      </div>

      {(backgroundDark || deleteModal || editModal) && (
        <div className="fixed z-10 inset-0 bg-[rgba(0,0,0,0.7)]" />
      )}

      {editModal && (
        <EditNoteForm noteToEdit={noteToEdit} closeAllModals={closeAllModals} />
      )}

      {deleteModal && (
        <DeleteNoteConfirm
        noteToDelete={noteToDelete}
          closeAllModals={closeAllModals}
        />
      )}
    </>
  );
};

export default Home;
