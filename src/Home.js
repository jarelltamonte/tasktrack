import "./Home.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

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

  // ✅ LOAD TASKS SAFELY ON PAGE LOAD
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        } else {
          console.warn("Invalid tasks data. Resetting...");
          localStorage.removeItem("tasks");
          setTasks([]);
        }
      } catch (err) {
        console.error("Error parsing saved tasks:", err);
        localStorage.removeItem("tasks");
        setTasks([]);
      }
    }
  }, []);

  // ✅ SAVE TASKS WHEN THEY CHANGE
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ OPEN / CLOSE MODAL
  function openModal(index = null) {
    setEditingIndex(index);
    if (index !== null && tasks[index]) {
      setNewTask(tasks[index]);
    } else {
      setNewTask({ name: "", date: "", time: "", priority: "Regular" });
    }
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingIndex(null);
    setNewTask({ name: "", date: "", time: "", priority: "Regular" });
  }

  function handleSubmit() {
    if (!newTask.name.trim()) return alert("Task name is required.");

    let finalDue = "No Due";

    if (newTask.time && !newTask.date) {
      const t = new Date();
      const [h, m] = newTask.time.split(":");
      t.setHours(h, m);
      finalDue = `Today at ${t.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    } else if (newTask.date && newTask.time) {
      const full = new Date(`${newTask.date}T${newTask.time}`);
      finalDue = full.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = { ...newTask, due: finalDue };
      setTasks(updated);
    } else {
      setTasks([...tasks, { ...newTask, due: finalDue }]);
    }

    closeModal();
  }

  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  return (
    <div className="home-container">
      <h1 className="header">Welcome to TaskTrack!</h1>
      <p>This is the main landing page of the application.</p>

      <div className="task-container">
        <h1 className="header">Tasks</h1>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks yet. Add one!</p>
          ) : (
            tasks.map(
              (task, index) =>
                task && (
                  <div key={index} className="task-card">
                    <p>
                      <strong>{task.name || "Untitled Task"}</strong>
                    </p>
                    <p>Due: {task.due || "No Due"}</p>
                    <p>Priority: {task.priority || "Regular"}</p>
                    <button onClick={() => openModal(index)}>Edit</button>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                  </div>
                )
            )
          )}
        </div>

        <button
          onClick={() => openModal()}
          style={{ marginTop: "10px" }}
          className="add-button"
        >
          <FaPlus />
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="add-modal">
            <h1>{editingIndex !== null ? "Edit Task" : "Add New Task"}</h1>

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
                min={new Date().toISOString().split("T")[0]}
                value={newTask.date}
                onChange={(e) =>
                  setNewTask({ ...newTask, date: e.target.value })
                }
              />
              <input
                type="time"
                value={newTask.time}
                onChange={(e) =>
                  setNewTask({ ...newTask, time: e.target.value })
                }
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
              <button onClick={handleSubmit}>
                {editingIndex !== null ? "Update Task" : "Save Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
