import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const createTask = async (req, res) => {
    try {
        const title = req.body;
        const task = new Task({ title });

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Lỗi khi gọi createTask", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
    
};

export const updateTask = (req, res) => {
    res.status(200).json({ message: "nhiem vu da duoc update thanh cong" });
};

export const deleteTask = (req, res) => {
    res.status(200).json({ message: "nhiem vu da duoc xoa thanh cong" });
};
