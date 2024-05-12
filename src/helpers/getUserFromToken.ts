import jwt from "jsonwebtoken";
import {Request} from "express"

export const getUserFromToken=async(req:Request)=>{
    try {
        const token=req.cookies.token||""
        //console.log(token)
        if(token){
            const userData=jwt.verify(token,process.env.TOKEN_SECRET!)
            return (userData as any).email
        }
    } catch (error) {
        return error
    }
}