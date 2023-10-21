import express from "express";
import dotenv from "dotenv";

import { connectPassport } from "./utils/provider.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

import cors from "cors";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

// Using middlewares

app.use(
  session({
    secret: process.env.SECRET_Id,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: false,
      // sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport and configure 
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: "https://frontend-btech-burger-5y24.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import userRoute from "./routes/user.js";
import orderRoute from "./routes/orders.js";

// Initialize Passport and configure it
connectPassport();

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

app.use(errorMiddleware);

export default app;
