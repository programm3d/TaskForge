import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  onStatusUpdate,
  onDelete,
  showActions,
  onRefresh,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onStatusUpdate={onStatusUpdate}
          onDelete={onDelete}
          showActions={showActions}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default TaskList;
