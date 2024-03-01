import React from "react";
import { Grid, Input, Typography, Link, Checkbox } from "@mui/joy";
import { useState } from "react";
import "./App.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: false },
  ]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, text: newTask, completed: false },
    ]);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <Header />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
        onToggleTask={toggleTaskCompletion}
      />
      <InputArea onAddTask={addTask} />
    </>
  );
}

function TaskList({ tasks, onDeleteTask, onEditTask, onToggleTask }) {
  return (
    <div className="task-container">
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <Checkbox
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                />
                <Typography
                  level="body-md"
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </Typography>
              </td>
              <td>{task.completed ? "Yes" : "No"}</td>
              <td>
                <button
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    onEditTask(task.id, prompt("Enter new task text:"))
                  }
                >
                  <EditIcon />
                </button>
                <button onClick={() => onDeleteTask(task.id)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Header() {
  return <h3 className="header">Todo App</h3>;
}

function InputArea({ onAddTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="input-container">
      <Input
        className="input"
        size="sm"
        style={{ backgroundColor: "#B1A59C", borderRadius: "0" }}
        variant="soft"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="add-button" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}

export default App;
