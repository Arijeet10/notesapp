import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { NoteDeleteType, NoteType } from "../types/NoteType";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  note: NoteType;
  openEditNote: (note: NoteType) => void;
  openDeleteNoteConfirm: (noteToDelete: NoteDeleteType) => void;
}

const NoteCard: React.FC<Props> = ({
  note,
  openEditNote,
  openDeleteNoteConfirm,
}) => {
  //console.log(note);

  const [viewNote, setViewNote] = useState(false);

  return (
    <>
      <div className="p-2 border rounded-md shadow-md flex flex-col justify-between">
        <div onClick={() => setViewNote(true)} className=" cursor-pointer">
          <div className="text-[3vw] sm:text-[2vw] font-medium">{note?.title}</div>
          <div className="text-[2vw] sm:text-[1.5vw]">{note?.desc}</div>
        </div>

        <div className="flex items-center justify-end gap-[0.5vw]">
          <div className="">
            <CiEdit
              onClick={() => openEditNote(note)}
              className="w-[3vw] h-[3vh] hover:text-[#3A244A]"
            />
          </div>
          <div className="">
            <AiOutlineDelete
              onClick={() =>
                openDeleteNoteConfirm({ id: note?.id, email: note?.email })
              }
              className="w-[3vw] h-[3vh] hover:text-[#D72638]"
            />
          </div>
        </div>
      </div>

      {viewNote && (
        <>
          <div className="fixed z-30 inset-0 bg-[rgba(0,0,0,0.7)]" />
          <div className="p-2 w-[60vw] border rounded-md shadow-md fixed z-30 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-[#ffffff]">
            <div className=" flex items-center justify-end">
              <div className="p-1 hover:rounded-full hover:bg-slate-100">
                <IoClose onClick={() => setViewNote(false)} className="" />
              </div>
            </div>
            <div className="">
              <div className="text-[3vw] sm:text-[3vw] font-medium">{note?.title}</div>
              <div className="text-[2vw] sm:text-[2vw]">{note?.desc}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NoteCard;
