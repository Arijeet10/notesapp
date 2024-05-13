import { addNote, deleteNote, editNote, getNotes, searchnotes } from "../controllers/note";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import cors from "cors";
import { corsOptions } from "../index";

const router=express.Router();




router.post("/addnote",cors(corsOptions),authMiddleware,addNote)
router.patch("/editnote",cors(corsOptions),authMiddleware,editNote)
router.delete("/deletenote",cors(corsOptions),authMiddleware,deleteNote)
router.get("/getnotes",cors(corsOptions),authMiddleware,getNotes)
router.get("/searchnotes",cors(corsOptions),authMiddleware,searchnotes)

export default router;