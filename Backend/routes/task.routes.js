const express = require("express");
const Task = require("../models/task.model");
const User = require('../models/user.model');
const authMiddleware = require("../middleware/authMiddleware");

const taskRouter = express.Router();

// Get tasks created by the logged-in user

taskRouter.get("/test-tasks", (req, res) => {
  res.status(200).send({ msg: "running successfully" });
});

taskRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ creator: req.userId }).populate(
      "assignees"
    );
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get tasks assigned to the logged-in user
taskRouter.get("/assigned", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ assignees: req.userId }).populate("creator");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new task (Only logged-in user can create)
taskRouter.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      title,
      description,
      creator: req.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

taskRouter.put("/:id/assign", authMiddleware, async (req, res) => {
  const { assigneeUsernames } = req.body; // Expect an array of usernames

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (task.creator.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: Only creator can assign users" });
    }

    const assignees = await User.find({ username: { $in: assigneeUsernames } }); // Find all matching users
    if (assignees.length === 0)
      return res.status(404).json({ error: "No valid users found" });

    task.assignees = assignees.map((user) => user._id); // Store user IDs
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
});

// Update task status (Only creator or assignee can update)
taskRouter.put("/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const assignee = task.assignees.filter(el=>el==req.userId);
    
    if (
      task.creator.toString() !== req.userId &&
      !assignee
    ) {
      return res
        .status(403)
        .json({ error: "Forbidden: Not authorized to update this task" });
    }

    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task (Only creator can delete)
taskRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (task.creator.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: Only creator can delete the task" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = taskRouter;
