import { useState } from "react";
import { createTask, updateTask, deleteTask, markTaskAsDone } from "../services";

export const useTaskManager = (refreshTasks) => {
    const [open, setOpen] = useState(false);
    const [taskData, setTaskData] = useState(null);
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddClick = () => {
        setIsEditing(false);
        setTaskData({ title: "", description: "", deadline: "", status: "TODO" });
        setFile(null);
        setOpen(true);
    };

    const handleEditClick = (task) => {
        setIsEditing(true);
        setTaskData(task);
        setFile(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskData(null);
        setFile(null);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("title", taskData.title);
        formData.append("description", taskData.description);
        formData.append("deadline", taskData.deadline);
        formData.append("status", taskData.status);
        if (file) formData.append("pdf", file);

        try {
            if (isEditing) {
                await updateTask(taskData._id, {
                    title: taskData.title,
                    description: taskData.description,
                    deadline: taskData.deadline,
                });
            } else {
                await createTask(formData);
            }
            await refreshTasks();
            handleClose();
        } catch (err) {
            console.error("Error saving task:", err);
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files.length) {
            setFile(event.target.files[0]);
        } else {
            setFile(null);
        }
    };

    const handleMarkAsDone = async (taskId) => {
        try {
            await markTaskAsDone(taskId);
            await refreshTasks();
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(taskId);
                await refreshTasks();
            } catch (err) {
                console.error("Error deleting task:", err);
            }
        }
    };

    return {
        open,
        taskData,
        file,
        isEditing,
        handleAddClick,
        handleEditClick,
        handleClose,
        handleSave,
        handleFileChange,
        handleMarkAsDone,
        handleDelete,
        setTaskData,
    };
};
