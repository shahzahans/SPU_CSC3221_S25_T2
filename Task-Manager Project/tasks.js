const express = require('express');
const router = express.Router();
const Task = require('./task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one task by ID 
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST create task
router.post('/', async (req, res) => {
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
});

// PUT update by title
router.put('/by-title/:title', async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { title: req.params.title },
      {
        title: req.body.title,
        completed: req.body.completed,
        dueDate: req.body.dueDate,
        description: req.body.description
      },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update task by title
router.patch('/by-title/:title', async (req, res) => {
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
});

// DELETE task
router.delete('/by-title/:title', async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ title: req.params.title });
    if (!deleted) return res.status(404).json({ error: 'Task not found with that title' });
    res.json({ success: true, message: `Deleted task with title '${req.params.title}'` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/// DELETE all tasks
router.delete('/', async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
