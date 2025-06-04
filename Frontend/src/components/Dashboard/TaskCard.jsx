// src/components/Dashboard/TaskCard.js
import React, { useState } from "react";
import {
  TrashIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import UserSearch from "./UserSearch";
import api from "../../services/api";
import toast from "react-hot-toast";

const TaskCard = ({
  task,
  onStatusUpdate,
  onDelete,
  showActions,
  onRefresh,
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    pending: <ClockIcon className="h-4 w-4" />,
    "in progress": <ClockIcon className="h-4 w-4" />,
    completed: <CheckCircleIcon className="h-4 w-4" />,
  };

  const handleAssign = async (selectedUsers) => {
    try {
      await api.put(`/task/${task._id}/assign`, {
        assigneeUsernames: selectedUsers,
      });
      toast.success("Users assigned successfully!");
      setShowAssignModal(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error("Failed to assign users");
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      pending: "in progress",
      "in progress": "completed",
      completed: "completed",
    };
    return statusFlow[currentStatus];
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex-1">
            {task.title}
          </h3>
          {showActions && (
            <button
              onClick={() => onDelete(task._id)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {task.description && (
          <p className="text-gray-600 mb-4">{task.description}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[task.status]
            }`}
          >
            {statusIcons[task.status]}
            <span className="ml-1">{task.status}</span>
          </span>
          <span className="text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>

        {task.assignees && task.assignees.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Assigned to:</p>
            <div className="flex flex-wrap gap-2">
              {task.assignees.map((assignee) => (
                <span
                  key={assignee._id}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {assignee.username}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          {task.status !== "completed" && (
            <button
              onClick={() =>
                onStatusUpdate(task._id, getNextStatus(task.status))
              }
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition duration-200 text-sm"
            >
              Move to {getNextStatus(task.status)}
            </button>
          )}
          {showActions && (
            <button
              onClick={() => setShowAssignModal(true)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
            >
              <UserGroupIcon className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {showAssignModal && (
        <UserSearch
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssign}
          currentAssignees={task.assignees?.map((a) => a.username) || []}
        />
      )}
    </>
  );
};

export default TaskCard;
