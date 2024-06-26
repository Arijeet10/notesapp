import {drizzle} from "drizzle-orm/node-postgres";
import { InferSelectModel, InferInsertModel,eq} from "drizzle-orm";
import { pgTable,serial,text} from "drizzle-orm/pg-core";
import {Pool} from "pg";

export const notes=pgTable("notes",{
    id:serial('id').primaryKey(),
    email:text("email").notNull(),
    title:text("title").notNull(),
    desc: text("desc").notNull(),
})

export type Note = InferSelectModel<typeof notes>;
export type NewNote = InferInsertModel<typeof notes>;

const pool=new Pool({
    //connectionString:process.env.DB,
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOSTNAME,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export const db=drizzle(pool);

//to get notes by email id
export const getNotesByEmail=async(email:string)=>{
    const result=await db.select().from(notes).where(eq(notes.email,email)).orderBy(notes.id)
    return result;
};

//to get a particular note
export const getNoteById=async(id:number)=>{
    const result=await db.select().from(notes).where(eq(notes.id,id))
    return result[0];
}

//create new note
export const createNote=async(newNote:NewNote)=>await db.insert(notes).values(newNote).returning({id:notes.id,email:notes.email,title:notes.title,desc:notes.desc});

//update note data by id
export const updateNoteById=async(id:number,updatedNote:{title:string,desc:string})=>await db.update(notes).set(updatedNote).where(eq(notes.id,id)).returning({id:notes.id,email:notes.email,title:notes.title,desc:notes.desc});

//delete note by id
export const deleteNoteById=async(id:number)=>await db.delete(notes).where(eq(notes.id, id));


//to get notes by search text
export const getNotesBySearch=async(email:string,search:string)=>{
    const result=await db.select().from(notes).where(eq(notes.desc,search))
    return result;
}