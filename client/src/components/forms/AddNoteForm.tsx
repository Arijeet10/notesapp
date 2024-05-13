import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { NotesContext, NotesContextType } from "../../context/NotesProvider";
import { getUser } from "../../utils/getUserFromLocalStorage";

//import environment variables
const apiUrl=import.meta.env.VITE_API_URL;


const AddNoteForm = () => {

  const {fetchUserNotes}=useContext<NotesContextType>(NotesContext)

  //to show or hide add note form
  const [expandAddNote, setExpandAddNote] = useState(false);

  const [note,setNote]=useState({
    title:"",
    desc:""
  })

  //submit new note form data
  const handleSubmit =async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //console.log(note)
    const user=getUser();
    const payload={
      email:user.email,
      title:note.title,
      desc:note.desc
    }
    if(!note.title||!note.desc){
      toast.error("Add Note Title and Description")
    }else{
      try {
        const res=await fetch(`${apiUrl}/addnote`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          mode: 'cors',
          credentials:"same-origin",
          body:JSON.stringify(payload)
        })
        const response=await res.json()
        //console.log(response);
        if(res.ok){
          toast.success(response.message)
          fetchUserNotes()
          setNote({
            title:"",
            desc:""
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

  };

  //close the add note section
  const handleClose=()=>{
    setExpandAddNote(false)
    setNote({
      title:"",
      desc:""
    })
  }

  return (
    <>
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-2 border rounded-md shadow-md"
        >
          <div className="flex flex-col gap-[1vh]">
            <div className={`${expandAddNote ? "block" : "hidden"}`}>
              <input
                type="text"
                required
                placeholder="Title"
                className=" w-full focus:outline-none text-[2vw]"
                value={note.title}
                onChange={(e)=>setNote({...note,title:e.target.value})}
              />
            </div>
            <div>
              <textarea
                required
                placeholder="Take a note..."
                className={`w-full focus:outline-none text-wrap ${
                  expandAddNote ? "text-[1.5vw]" : "text-[2vw]"
                }`}
                onClick={() => setExpandAddNote(true)}
                value={note.desc}
                onChange={(e)=>setNote({...note,desc:e.target.value})}
              />
            </div>
          </div>
          <div
            className={`flex items-center justify-end gap-[1vw] font-medium text-[1.5vw] ${
              expandAddNote ? "block" : "hidden"
            }`}
          >
            <div className="p-1 border rounded-sm hover:bg-slate-100 ">
              <input type="submit" value="Add Note" className="" />
            </div>
            <div className="p-1 border rounded-sm hover:bg-slate-100">
              <div onClick={() => handleClose()} className="cursor-pointer">
                Close
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNoteForm;
