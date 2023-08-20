import express from "express";
import { config } from "dotenv";
import usersRouter from "./routes/users.js";
import tasksRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

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
app.use("/api/v1/tasks", tasksRouter);


app.get("/", (req, res) => {
    res.send("Working.");
});


// using error middleware
app.use(errorMiddleware);