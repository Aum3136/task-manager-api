const express = require('express')
const router = express.Router()
const { tasks, getNextId } = require('../data/tasks')
const validateId = require('../middleware/validateId')

// GET /tasks — return all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks)
})

// POST /tasks — create a new task
router.post('/', (req, res, next) => {
  try {
    const { title, completed } = req.body

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required and must be a string' })
    }

    const newTask = {
      id: getNextId(),
      title,
      completed: Boolean(completed),
    }

    tasks.push(newTask)
    res.status(201).json(newTask)
  } catch (err) {
    next(err) // hand off to the global error handler
  }
})

// PUT /tasks/:id — update an existing task
router.put('/:id', validateId, (req, res) => {
  const id = Number(req.params.id)
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return res.status(404).json({ error: `Task with id ${id} not found` })
  }

  const { title, completed } = req.body
  if (title !== undefined) task.title = title
  if (completed !== undefined) task.completed = Boolean(completed)

  res.status(200).json(task)
})

// DELETE /tasks/:id — delete a task
router.delete('/:id', validateId, (req, res) => {
  const id = Number(req.params.id)
  const index = tasks.findIndex((t) => t.id === id)

  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${id} not found` })
  }

  const deleted = tasks.splice(index, 1)[0]
  res.status(200).json({ message: 'Task deleted', task: deleted })
})

module.exports = router