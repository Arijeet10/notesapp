import jwt from 'jsonwebtoken';
import express,{Request,Response,NextFunction} from 'express';

export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    try {

        //get token from cookies
        const token= req.cookies.token;
        //console.log(token)
        if(!token){
            return res.status(400).json({message:"Invalid Authentication"})
        }

        //verify token
        await jwt.verify(token,process.env.TOKEN_SECRET!,(error:any,user:any)=>{
            if(error){
                return res.status(400).json({message:"Invalid Authorization"})
            }
            (req as any).user=user;
            next();
        })
    } catch (error) {
        return res.status(500).json({message:"Token Error:",error})
    }
}