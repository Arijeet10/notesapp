import express from  "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes"

const app=express();
const PORT=process.env.PORT || 3000;

//Middlewares
app.use(cors({credentials:true,origin:true,methods:["POST","GET","PATCH","DELETE"]}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//Server Routes
app.use('/auth',authRoutes);
app.use('/',noteRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}...`);
});









