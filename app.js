import express from "express";
import { config } from "dotenv";
import usersRouter from "./routes/users.js";
import cookieParser from "cookie-parser";

export const app = express();


// setting up dotenv
config({
    path: "./data/config.env"
});


// using middleware
app.use(express.json());
app.use(cookieParser());

// using routes
app.use("/api/v1/users", usersRouter);


app.get("/", (req, res) => {
    res.send("Working.");
});
