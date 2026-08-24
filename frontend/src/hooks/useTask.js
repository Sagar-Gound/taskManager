import { useState, useEffect } from "react";
import { fetchTasks } from "../services";

export const useTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshTasks = async () => {
        setLoading(true);
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return { tasks, loading, refreshTasks };
};
