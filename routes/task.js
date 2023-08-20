import express from "express";
import { deleteTask, getAllTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


router.post("/new", isAuthenticated, newTask);


router.get("/all", isAuthenticated, getAllTasks);


// dynamic url and using router.route() for multiple different request methods
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);


export default router;