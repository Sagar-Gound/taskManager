import axios from "axios";

const API_URL = "http://localhost:8082/tasks";

export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

export const updateTask = async (taskId, data) => {
    const response = await axios.patch(`${API_URL}/${taskId}`, data);
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
};

export const markTaskAsDone = async (taskId) => {
    const response = await axios.patch(`${API_URL}/${taskId}`, { status: "DONE" });
    return response.data;
};
