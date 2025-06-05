const Task = require('../Task'); // Adjust path if needed


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      completed: req.body.completed || false,
      dueDate: req.body.dueDate,
      description: req.body.description
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateTaskByTitle = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { title: req.params.title },
      {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: req.body.completed
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const patchTaskByTitle = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTaskByTitle = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ title: req.params.title });
    if (!deleted) return res.status(404).json({ error: 'Task not found with that title' });
    res.json({ success: true, message: `Deleted task with title '${req.params.title}'` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET task by title
const getTaskByTitle = async (req, res) => {
  try {
    const task = await Task.findOne({ title: new RegExp(`^${req.params.title}$`, 'i') });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskByTitle,
  patchTaskByTitle,
  deleteTaskByTitle,
  deleteAllTasks,
  getTaskByTitle 
};
