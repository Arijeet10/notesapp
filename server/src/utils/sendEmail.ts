import nodemailer from "nodemailer";
import { ApiResponse } from "../types/ApiResponse";

const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS,
    }
});

const sendEmail=async(email:string,url:string):Promise<ApiResponse>=>{
    try {

        await transporter.sendMail({
            from:process.env.EMAIL,
            to:email,
            subject:"Account Verification",
            html:`<p>Click on <a href=${url}>here</a> to sign up to the notes app</p>`,
        })

        console.log("Email Sent Successfully");
        return {message:"Email Sent Successfully",success:true}
    } catch (error) {
        console.log("Error in sending email:",error);
        return {message:"Error in sending email",success:false};
    }
}


export default sendEmail;

