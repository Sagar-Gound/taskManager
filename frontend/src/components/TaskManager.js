import React from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import { LoadingIndicator } from "./LoadingIndicator";
import { AddCircleRounded } from "@mui/icons-material";
import { useTask } from "../hooks/useTask";
import { useTaskManager } from "../hooks/useTaskManager";
import { downloadFile } from "../utils";

export const TaskManager = () => {
    const { tasks, loading, refreshTasks } = useTask();
    const {
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
    } = useTaskManager(refreshTasks);

    return (
        <div>
            {loading ? (
                <LoadingIndicator />
            ) : tasks.length ? (
                <TaskTable
                    tasks={tasks}
                    onMarkAsDone={handleMarkAsDone}
                    onDownloadFile={downloadFile}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        No tasks found!
                    </Typography>
                </Box>
            )}
            <TaskModal
                open={open}
                handleClose={handleClose}
                taskData={taskData}
                handleChange={(field, value) =>
                    setTaskData((prev) => ({ ...prev, [field]: value }))
                }
                handleSave={handleSave}
                handleFileChange={handleFileChange}
                file={file}
                isEditing={isEditing}
            />

            <Fab
                aria-label="add"
                color="primary"
                onClick={handleAddClick}
                style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
            >
                <AddIcon />
            </Fab>
        </div>
    );
};