import './Home.css'
import { useState } from "react";


const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ name: "", due: "", priority: "Regular" });


    // TASK BUTTONS ============

    function deleteTask(index) {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    // ADD TASK MODAL =============

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setNewTask({ name: "", due: "", priority: "Regular" });
    }

    function handleSubmit() {
        if (!newTask.name.trim()) return alert("Task name is required."); //Ask
        setTasks([...tasks, newTask]);
        closeModal();
    }

    return (
        <div className="home-container">
            <h1>Welcome to TaskTrack!</h1>
            <p>This is the main landing page of the application.</p>

            <div class="task-container">

                <h1>Tasks</h1>

                {/* TASK LIST CONTAINER */}
                <div className="task-list">
                    {tasks.map((task, index) => (
                        <div key={index} className="task-card">
                            <p><strong>{task.name}</strong></p>
                            <p>Due: {task.due || "No Due"}</p>
                            <p>Priority: {task.priority}</p>
                            <button onClick={() => deleteTask(index)}>Delete Task</button>
                        </div>
                    ))}
                </div>

                <button onClick={openModal} style={{ marginTop: "10px" }}>
                    + Add Task
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
                        <input
                            type="datetime-local"
                            value={newTask.due}
                            onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                        />

                        <label>Priority</label>
                        <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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
}

export default Home;