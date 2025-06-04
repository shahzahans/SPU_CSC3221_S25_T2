const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskByTitle,
  patchTaskByTitle,
  deleteTaskByTitle,
  deleteAllTasks
} = require('./controllers/taskController'); // Adjust path if needed

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/by-title/:title', updateTaskByTitle);
router.patch('/by-title/:title', patchTaskByTitle);
router.delete('/by-title/:title', deleteTaskByTitle);
router.delete('/', deleteAllTasks);

module.exports = router;
