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
    secret: process.env.SECRET_ID,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: ".vercel.app", // Set the domain to include all subdomains of Vercel
      // secure: true, // Set to true if using HTTPS
      // httpOnly: true, // Set to true for better security
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport and configure it
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

app.use("/api/v1/user", userRoute); // Use a more specific route path
app.use("/api/v1/orders", orderRoute); // Use a more specific route path

app.use(errorMiddleware);

export default app;
