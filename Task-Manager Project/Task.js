const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },             // Task title (required)
  completed: { type: Boolean, default: false },        // Completion status (default: false)
  createdAt: { type: Date, default: Date.now },        // Timestamp when task is created
  dueDate: { type: Date },                             // Optional due date
  description: { type: String }                        // Optional task description
});

module.exports = mongoose.model('Task', TaskSchema);   // Export the Task model