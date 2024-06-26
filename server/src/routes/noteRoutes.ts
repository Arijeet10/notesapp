import { addNote, deleteNote, editNote, getNotes, searchnotes } from "../controllers/note";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router=express.Router();




router.post("/addnote",authMiddleware,addNote)
router.patch("/editnote",authMiddleware,editNote)
router.delete("/deletenote",authMiddleware,deleteNote)
router.get("/getnotes",authMiddleware,getNotes)
router.get("/searchnotes",authMiddleware,searchnotes)

export default router;