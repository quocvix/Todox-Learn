import mongoose from "mongoose";

const taskScheme = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "complete"],
            default: "active",
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true, // createdAt và updatedAt tự động thêm
    }
);

const Task = mongoose.model("Task", taskScheme); // model: "Task"

export default Task; 
