const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// GET /tasks — return all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
})

// GET /tasks/:id — return a single task (supplementary task)
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found` })
    }
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
})

// POST /tasks — create a new task
router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
})

// PUT /tasks/:id — update an existing task
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found` })
    }

    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
})

// DELETE /tasks/:id — delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found` })
    }

    res.status(200).json({ message: 'Task deleted', task })
  } catch (err) {
    next(err)
  }
})

module.exports = router