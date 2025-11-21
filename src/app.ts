import cookieParser from "cookie-parser";
import cors from "cors";

import express, { Request, Response } from "express";
import { router } from "./app/routes/index ";
import { globalErrorHandler } from "./middleWares/globalErrorHandler";
import { notFoundHandler } from "./middleWares/notFound";



const app = express();

// Vercel er jonno trust proxy
app.set("trust proxy", 1);

// CORS setup
app.use(cors({
  origin: [
   
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

// Cookie parser
app.use(cookieParser());





// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Portfolio Server",
    });
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;