// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("created");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const [createdRes, assignedRes] = await Promise.all([
        api.get("/task/"),
        api.get("/task/assigned"),
      ]);
      setTasks(createdRes.data);
      setAssignedTasks(assignedRes.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
    setShowCreateModal(false);
    toast.success("Task created successfully!");
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await api.put(`/task/${taskId}`, { status: newStatus });
      fetchTasks();
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await api.delete(`/task/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-200"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Task</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("created")}
              className={`py-2 px-6 border-b-2 font-medium text-sm ${
                activeTab === "created"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Created by Me ({tasks.length})
            </button>
            <button
              onClick={() => setActiveTab("assigned")}
              className={`py-2 px-6 border-b-2 font-medium text-sm ${
                activeTab === "assigned"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Assigned to Me ({assignedTasks.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "created" ? (
            <TaskList
              tasks={tasks}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleTaskDelete}
              showActions={true}
              onRefresh={fetchTasks}
            />
          ) : (
            <TaskList
              tasks={assignedTasks}
              onStatusUpdate={handleStatusUpdate}
              showActions={false}
            />
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateTask
          onClose={() => setShowCreateModal(false)}
          onCreate={handleTaskCreated}
        />
      )}
    </div>
  );
};

export default Dashboard;
