import { Task } from "../models/task.js";
import ErrorHandler from "../utils/error.js";


export const newTask = async (req, res, next) => {

    try {

        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message: "Task added successfully",
        });

    } catch (error) {
        next(error);
    }

}


export const getAllTasks = async (req, res, next) => {

    try {
        
        // BOTH WORK !!
        // const tasks = await Task.find({ user: req.user._id });
        const tasks = await Task.find({ user: req.user });

        res.status(200).json({
            success: true,
            tasks,
        });

    } catch (error) {
        next(error);
    }

}


export const updateTask = async (req, res, next) => {

    try {
        
        const task = await Task.findById( req.params.id );

        if(!task) return next(new ErrorHandler("Task NOT FOUND", 404));

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully."
        });

    } catch (error) {
        next(error);
    }

}


// export const editTask = async (req, res, next) => {}


export const deleteTask = async (req, res, next) => {

    try {
        
        const task = await Task.findById( req.params.id );

        if(!task) return next(new ErrorHandler("Task NOT FOUND", 404));

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task DELETED successfully."
        });

    } catch (error) {
        next(error);
    }

}
