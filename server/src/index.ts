import express,{Request,Response,NextFunction} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

//allow origin access control 
app.use(function(req:Request, res:Response, next:NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT,PATCH, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Middlewares
app.use(
  cors({
    origin: [process.env.REACT_APP_BASE_URL as string],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//Default
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, this is notes app server");
});

//Server Routes
app.use("/auth", authRoutes);
app.use("/", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

export default app;
