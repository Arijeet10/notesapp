import express from "express";
import { createUser,db,getUserByEmail, users } from "../db/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/sendEmail";
import { eq } from "drizzle-orm";

export const register=async(req:express.Request,res:express.Response)=>{
    try {

        const {email,password}=req.body;
        //console.log(email,password)

        //check if user data is given 
        if(!email||!password){
            return res.status(400).json({message:"No user data provided"})
        }

        //check if account exists with email
        const user=await getUserByEmail(email);

        if(user){
            return res.status(400).json({message:"Account already exists"})
        }

        const token=jwt.sign({email},process.env.TOKEN_SECRET!,{expiresIn:'1h'});
        const verifyUrl=`${process.env.REACT_APP_BASE_URL}/verify/${token}`

        //send verification mail
        const emailResponse=await sendEmail(email,verifyUrl)

        //check if verification mail was sent successfully
        if(!emailResponse.success){
            return res.status(400).json({message:emailResponse.message})
        }

        //hash password with bcryptjs
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(password,salt)
        
        //create new user
        const newUser=await createUser({
            email,
            password:hashedPassword,
            verified:false,
            verificationToken:token,
        });

        return res.status(201).json({message:"Account Created, check your mail to verify the account",user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"User Registration Error"})
    }
}


export const login=async(req:express.Request,res:express.Response)=>{
    try {

        const {email,password}=req.body;
        //console.log(email,password)

        if(!email||!password){
            return res.status(400).json({message:"No User Credentials Provided"})
        }

        //get user from database
        const user=await getUserByEmail(email);
        //console.log(user)

        //check if account exists or not
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        //check if password is correct
        const verifyPassword=await bcrypt.compare(password,user.password)
        if(!verifyPassword){
            return res.status(400).json({message:"Incorrect Password"})
        }

        //check if account is verified or not
        if(!user.verified){
            return res.status(400).json({message:"Account is not verified, verify your account from the registered email"})
        }


        //generate token for login session
        const token= jwt.sign({email},process.env.TOKEN_SECRET!,{expiresIn:'1d'})


        const cookiesOption={
            httpOnly:true,
            secure:true,
            domain:"localhost",
            path:"/",
        }

        //set token in cookies
        res.cookie("token",token,cookiesOption)

        return res.status(201).json({
            token:token,
            message:"Login Successful",
            user:{
                id:user.id,
                email:user.email
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Login Error",error})
    }
}


export const verify=async(req:express.Request,res:express.Response)=>{
    
    const {token}=req.params;

    try {
        
        //verify token using jwt
        const decodedToken=jwt.verify(token,process.env.TOKEN_SECRET!)

        if(!decodedToken){
            return res.status(400).json({message:"Token Verification failed"})
        }

        //extract email from decoded token
        const email=(decodedToken as any).email;

        //mark the user as verified to true in database
        const verifiedUser=await db.update(users).set({verified:true}).where(eq(users.email,email)).returning({id:users.id,email:users.email,verified:users.verified});

        return res.status(201).json({message:'User Verified successfully',verifiedUser})


    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Verification Error:",error})
    }
}


export const logout=async(req:express.Request,res:express.Response)=>{
    try {
        //console.log("Logout Request")
        const cookiesOption={
            httpOnly:true,
            secure:true,
            domain:'localhost',
            path:"/",
            expires:new Date(0)
        }

        //remove cookies
        res.cookie("token","",cookiesOption)

        return res.status(201).json({message:"Logout successful"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Logout Error:",error})
    }
}