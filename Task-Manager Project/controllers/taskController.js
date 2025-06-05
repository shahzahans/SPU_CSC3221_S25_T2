const Task = require('../Task'); // Load the Task model


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Retrieve all tasks from the database
    res.json(tasks); // Send tasks as JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle server error
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by MongoDB ID
    if (!task) return res.status(404).json({ error: 'Task not found' }); // Return 404 if not found
    res.json(task); // Send found task as response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle server error
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title, // Title from request body
      completed: req.body.completed || false, // Default to false if not provided
      dueDate: req.body.dueDate, // Optional due date
      description: req.body.description // Optional description
    });

    const savedTask = await newTask.save(); // Save task to database
    res.status(201).json(savedTask); // Respond with created task
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle validation or bad request error
  }
};

const updateTaskByTitle = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { title: req.params.title }, // Find task by title
      {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: req.body.completed
      },
      { new: true, runValidators: true } // Return updated doc and validate fields
    );

    if (!updated) return res.status(404).json({ error: 'Task not found' }); // Return 404 if no match
    res.json(updated); // Respond with updated task
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle validation error
  }
};


const patchTaskByTitle = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { title: req.params.title }, // Match task by title
      req.body, // Apply only provided fields
      { new: true, runValidators: true } // Return updated doc and validate
    );
    if (!updated) return res.status(404).json({ error: 'Task not found' }); // Return 404 if not found
    res.json(updated); // Return updated task
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle update errors
  }
};

const deleteTaskByTitle = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ title: req.params.title }); // Delete task by title
    if (!deleted) return res.status(404).json({ error: 'Task not found with that title' }); // 404 if not found
    res.json({ success: true, message: `Deleted task with title '${req.params.title}'` }); // Confirm deletion
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle deletion errors
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({}); // Delete all tasks
    res.json({ deletedCount: result.deletedCount }); // Respond with number deleted
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle server error
  }
};

// GET task by title
const getTaskByTitle = async (req, res) => {
  try {
    const task = await Task.findOne({ title: new RegExp(`^${req.params.title}$`, 'i') }); // Case-insensitive title match
    if (!task) return res.status(404).json({ error: 'Task not found' }); // 404 if not found
    res.json(task); // Return matched task
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle server error
  }
};

module.exports = {
  getAllTasks, // Export function
  getTaskById,
  createTask,
  updateTaskByTitle,
  patchTaskByTitle,
  deleteTaskByTitle,
  deleteAllTasks,
  getTaskByTitle 
};