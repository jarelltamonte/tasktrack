import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        name: "",
        date: "",
        time: "",
        priority: "Regular",
    });

    // PROGRESS SAVER ====================

    // LOAD TASKS ON PAGE LOAD
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    // SAVE TASKS WHEN THEY CHANGE
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    // ADD TASK MODAL ====================

    function openModal(index = null) {
        setEditingIndex(index);
        if (index !== null) {
            setNewTask(tasks[index]);
        }
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingIndex(null);
        setNewTask({ name: "", date: "", time: "", priority: "Regular" });
    }

    function handleSubmit() {
        // Checks if there is a task name
        if (!newTask.name.trim()) return alert("Task name is required.");

        let finalDue = "No Due";

        // If user enters time without datre, defaults to today
        if (newTask.time && !newTask.date) {
            const t = new Date();
            const [h, m] = newTask.time.split(":");
            t.setHours(h, m);
            finalDue = `Today at ${t.toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            })}`;
        }
        // If user enters FULL DATE + TIME
        else if (newTask.date && newTask.time) {
            const full = new Date(`${newTask.date}T${newTask.time}`);
            finalDue = full.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
            });
        }

        // Sets the new task with all 3 details
        if (editingIndex !== null) {
            // ✅ EDIT EXISTING TASK
            const updated = [...tasks];
            updated[editingIndex] = { ...newTask, due: finalDue };
            setTasks(updated);
        } else {
            // ✅ ADD NEW TASK
            setTasks([...tasks, { ...newTask, due: finalDue }]);
        }
        closeModal();
    }

    // DELETE TASK BUTTON ====================

    function deleteTask(index) {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    // LOGIC ====================
    return (
        <div className="home-container">
            <h1>Welcome to TaskTrack!</h1>
            <p>This is the main landing page of the application.</p>

            <div className="task-container">
                <h1>Tasks</h1>

                <div className="task-list">
                    {tasks.map((task, index) => (
                        <div key={index} className="task-card">
                            <p style={{ flex: "5px" }}>
                                <strong>{task.name}</strong>
                            </p>
                            <p>Due: {task.due}</p>
                            <p>Priority: {task.priority}</p>
                            
                            <button onClick={() => deleteTask(index)}>Delete Task</button>
                        </div>
                    ))}
                </div>

                <button onClick={openModal} style={{ marginTop: "10px" }}>
                    Add Task
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="add-modal">
                        <h1>Add New Task</h1>

                        <label>Task Name</label>
                        <input
                            type="text"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                            placeholder="Enter task name"
                        />

                        <label>Due Date & Time</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                type="date"
                                value={newTask.date}
                                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                            />
                            <input
                                type="time"
                                value={newTask.time}
                                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                            />
                        </div>

                        <label>Priority</label>
                        <select
                            value={newTask.priority}
                            onChange={(e) =>
                                setNewTask({ ...newTask, priority: e.target.value })
                            }
                        >
                            <option>Urgent</option>
                            <option>Regular</option>
                            <option>Low</option>
                        </select>

                        <div className="modal-buttons">
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={handleSubmit}>Save Task</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
