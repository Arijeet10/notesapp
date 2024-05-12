import { useContext, useState } from "react";
import { NoteType } from "../../types/NoteType";
import toast from "react-hot-toast";
import { NotesContext } from "../../context/NotesProvider";

//import environment variables
const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
  noteToEdit: NoteType;
  closeAllModals: () => void;
}

const EditNoteForm: React.FC<Props> = ({ noteToEdit, closeAllModals }) => {
  //to fetch notes
  const { fetchUserNotes } = useContext(NotesContext);

  //to set edited notes
  const [note, setNote] = useState({
    title: noteToEdit.title,
    desc: noteToEdit.desc,
  });

  //function to submit edited note to api
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!note.title && !note.desc) {
      toast.error("No data given to update");
    } else {
      //set the note data for payload to api
      const payload = {
        id: noteToEdit.id,
        email: noteToEdit.email,
        title: note.title,
        desc: note.desc,
      };
      try {
        const res = await fetch(`${apiUrl}/editnote`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'cors',
          credentials: "include",
          cache: "no-store",
          body: JSON.stringify(payload),
        });
        const response = await res.json();
        if (res.ok) {
          toast.success(response.message);
          fetchUserNotes();
          closeAllModals();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-[60vw] p-2 bg-[#ffffff] border rounded-sm shadow-md fixed z-50 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
          <div className="flex flex-col gap-[1vh]">
            <div className={``}>
              <input
                type="text"
                placeholder={`${noteToEdit.title}`}
                className=" w-full focus:outline-none text-[2vw]"
                value={note.title}
                onChange={(e) => setNote(prevState=>({ ...prevState, title: e.target.value }))}
              />
            </div>
            <div>
              <textarea
                placeholder={`${noteToEdit.desc}`}
                className={`text-[1.5vw] w-full focus:outline-none text-wrap`}
                value={note.desc}
                onChange={(e) => setNote(prevState=>({ ...prevState, desc: e.target.value }))}
              />
            </div>
          </div>
          <div
            className={`flex items-center justify-end gap-[1vw] font-medium text-[1.5vw] `}
          >
            <div className="p-1 border rounded-sm hover:bg-slate-100 ">
              <input type="submit" value="Save" className="" />
            </div>
            <div className="p-1 border rounded-sm hover:bg-slate-100">
              <div onClick={() => closeAllModals()} className="cursor-pointer">
                Cancel
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditNoteForm;
