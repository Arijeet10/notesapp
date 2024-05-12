import { createNote, deleteNoteById, getNoteById, getNotesByEmail, getNotesBySearch, updateNoteById } from "../db/note";
import express from "express";
import { getUserFromToken } from "../helpers/getUserFromToken";

export const searchnotes=async(req:express.Request,res:express.Response)=>{
  try {

    const userEmail = await getUserFromToken(req);

    //check if user is signed in before searching notes
    if (!userEmail) {
      return res.status(400).json({ message: "Signin First to search notes" });
    }

    //get search text from request query
    const query=req.query.search as string;

    //check if search text is provided or not
    if(!query){
      return res.status(400).json({message:"No Search Input Provided"})
    }

    //get the result notes as for the search query
    const resultNotes=await getNotesBySearch(userEmail,query)

    //check if the notes is there in database or not
    if(!resultNotes){
      return res.status(400).json({message:"No Notes Found"})
    }

    return res.status(201).json({message:"Notes Found successfully",resultNotes})

    
  } catch (error) {
    console.log("Cannot find searched notes:",error)
    return res.status(500).json({message:"Can't find searched notes:",error})
  }
}

export const getNotes=async(req:express.Request,res:express.Response)=>{
  try {
    
    const userEmail = await getUserFromToken(req);
    //console.log(userEmail)
    //check if user is signed in before editing notes
    if (!userEmail) {
      return res.status(400).json({ message: "Signin First to view notes" });
    }

    const notes=await getNotesByEmail(userEmail)

    //check if notes is available
    if(!notes){
      return res.status(400).json({message:"No Notes Available"})
    }

    return res.status(201).json({message:"Notes fetched successfully",notes})


  } catch (error) {
    console.log("Notes Fetch Error:",error)
    return res.status(500).json({message:"Error in fetching notes:",error})
  }
}

export const addNote = async (req: express.Request, res: express.Response) => {
  try {
    const { email, title, desc } = req.body;

    //check if note data is provided or not
    if (!email || !title || !desc) {
      return res.status(400).json({ message: "No note data provided" });
    }

    //create new note
    const newNote = await createNote({
      email,
      title,
      desc,
    });

    return res.status(201).json({ message: "Note Added successfully",newNote });
  } catch (error) {
    console.log("Add Note error:",error);
    return res.status(500).json({ message: "Failed to add note:", error });
  }
};

export const editNote = async (req: express.Request, res: express.Response) => {
  try {
    const { id, email, title, desc } = req.body;
    //check if data is provided for edit
    if (!id || !email || (!title && !desc)) {
      return res.status(400).json({ message: "Note data not provided to edit" });
    }

    const userEmail = await getUserFromToken(req);

    //check if user is signed in before editing notes
    if (!userEmail) {
      return res.status(400).json({ message: "Sign in first to add note" });
    }

    //check if email matches with the signed in user to edit notes
    if (userEmail !== email) {
      return res.status(400).json({ message: "Cannot edit others' note" });
    }

    //get the note from database to edit
    const note = await getNoteById(id);

    //check if note is in the database
    if(!note){
        return res.status(404).json({message:"Note not found"});
    }

    //update the note
    const updatedNote={
        title:title||note.title,
        desc:desc||note.desc,
    };

    await updateNoteById(id,updatedNote);

    return res.status(201).json({ message: "Note Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Edit Note Error:", error });
  }
};

export const deleteNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, email } = req.body;

    //check if data is provided for deletion
    if (!id || !email) {
      return res.status(400).json({ message: "No note provided to delete" });
    }

    const userEmail = await getUserFromToken(req);

    //check if user is signed in before editing notes
    if (!userEmail) {
      return res.status(400).json({ message: "Signin First to delete note" });
    }

    //check if email matches with the signed in user to delete notes
    if (userEmail !== email) {
      return res.status(400).json({ message: "Cannot delete others' note" });
    }

    await deleteNoteById(id);

    return res.status(201).json({message:"Note Deleted successfully"});



  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Delete Note Error:", error });
  }
};
