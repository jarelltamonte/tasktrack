import "./Dashboard.css";
import { useTasks } from "./TaskContext";

const Dashboard = () => {
  const { tasks, deletedCount } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <div className="dashboard-container">
      <h1 className="header">Dashboard</h1>
      <p className="subtext">Track your overall task statistics</p>

      <div className="dashboard-stats">
        <div className="dash-card total">
          <h2>Total Tasks</h2>
          <p>{total}</p>
        </div>
        <div className="dash-card progress">
          <h2>In Progress</h2>
          <p>{inProgress}</p>
        </div>
        <div className="dash-card completed">
          <h2>Completed</h2>
          <p>{completed}</p>
        </div>
        <div className="dash-card deleted">
          <h2>Deleted</h2>
          <p>{deletedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
