import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [deletedCount, setDeletedCount] = useState(0); // ✅ track deleted tasks

  // ✅ Load from localStorage on start
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedDeleted = localStorage.getItem("deletedCount");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedDeleted) setDeletedCount(parseInt(savedDeleted, 10));
  }, []);

  // ✅ Save to localStorage whenever tasks or deleted count change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("deletedCount", deletedCount.toString());
  }, [tasks, deletedCount]);

  // ✅ Delete function that updates both state and counter
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setDeletedCount((prev) => prev + 1); // increment deleted counter
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, deletedCount, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
