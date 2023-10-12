import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import { connectPassport } from "./utils/provider.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import orderRoute from "./routes/orders.js";
import cors from "cors";
const app=express();

dotenv.config({
    path: "./config/config.env"
})

//using middle-wares

app.use(session({
    secret:process.env.SECRET_Id,
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
connectPassport();

app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute);

app.use(errorMiddleware);
export default app;