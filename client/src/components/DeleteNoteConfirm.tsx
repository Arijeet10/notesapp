import { useContext } from "react";
import toast from "react-hot-toast";
import { NotesContext } from "../context/NotesProvider";
import { NoteDeleteType } from "../types/NoteType";

//import environment variables
const apiUrl=import.meta.env.VITE_API_URL;


interface Props{
    closeAllModals:()=>void;
    noteToDelete:NoteDeleteType
}

const DeleteNoteConfirm:React.FC<Props>=({noteToDelete,closeAllModals})=>{

    const {fetchUserNotes}=useContext(NotesContext)

    const handleDeleteNote=async()=>{
        console.log("Note to delete:",noteToDelete)
        try {
            const res=await fetch(`${apiUrl}/deletenote`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                  },
                  credentials:"include",
                  cache:"no-store",
                  body:JSON.stringify(noteToDelete)
            })
            const response=await res.json()
            if(res.ok){
                toast.success(response.message)
                fetchUserNotes()
                closeAllModals()
            }else{
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error)

        }
    }

    return(
        <>
            <div className="w-[60vw] p-2 bg-[#ffffff] border rounded-sm shadow-md fixed z-50 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] flex flex-col">
                <div className="py-4">
                    Are you sure you want to delete the note?
                </div>
                <div className="flex items-center justify-end gap-[1vw]">
                    <button onClick={()=>handleDeleteNote()} className="px-2 border rounded-sm hover:border-[#D72638] hover:bg-[#D72638] hover:text-[#ffffff]">
                        Yes
                    </button>
                    <button onClick={()=>closeAllModals()} className="px-2 border rounded-sm hover:bg-slate-100">
                        No
                    </button>
                </div>
            </div>

        </>
    )
}

export default DeleteNoteConfirm;