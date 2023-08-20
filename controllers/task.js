import { Task } from "../models/task.js";


export const newTask = async (req, res, next) => {

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

}


export const getAllTasks = async (req, res, next) => {

    // BOTH WORK !!
    // const tasks = await Task.find({ user: req.user._id });
    const tasks = await Task.find({ user: req.user });

    res.status(200).json({
        success: true,
        tasks,
    });

}


export const updateTask = async (req, res, next) => {

    const task = await Task.findById( req.params.id );

    if(!task) return res.status(404).json({
        success: false,
        message: "Task NOT FOUND!"
    });

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated successfully."
    });
    
}


// export const editTask = async (req, res, next) => {}


export const deleteTask = async (req, res, next) => {

    const task = await Task.findById( req.params.id );

    if(!task) return res.status(404).json({
        success: false,
        message: "Task NOT FOUND!"
    });

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task DELETED successfully."
    });

}
