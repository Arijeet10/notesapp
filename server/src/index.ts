import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();
const corsOptions={
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials:true

}
//Middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials:true
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//Default
app.get("/",cors(corsOptions), (req: express.Request, res: express.Response) => {
  res.send("Hello, this is notes app server");
});

//Server Routes
app.use("/auth",cors(corsOptions), authRoutes);
app.use("/",cors(corsOptions), noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

export default app;
