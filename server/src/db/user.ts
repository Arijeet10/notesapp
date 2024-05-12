import {drizzle} from "drizzle-orm/node-postgres";
import {type InferSelectModel,type InferInsertModel,eq} from "drizzle-orm";
import { boolean, pgTable,serial,text} from "drizzle-orm/pg-core";
import {Pool} from "pg";

export const users=pgTable("notesUsers",{
    id:serial('id').primaryKey(),
    email:text("email").notNull(),
    password:text("password").notNull(),
    verified: boolean("verified").default(false),
    verificationToken:text("verificationToken"),
})

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const pool=new Pool({
    connectionString:process.env.DB,
});

export const db=drizzle(pool);

//to get user details by email id
export const getUserByEmail=async(email:string):Promise<User|undefined>=>{
    const result=await db.select().from(users).where(eq(users.email,email))
    return result[0];
};

//create new user
export const createUser=async(newUser:NewUser)=>await db.insert(users).values(newUser).returning({id:users.id,email:users.email});

//update user data by id
export const updateUserById=async(id:number,updatedUser:User)=>await db.update(users).set(updatedUser).where(eq(users.id,id)).returning({id:users.id,email:users.email});
