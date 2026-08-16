const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const logger = require('./middleware/logger')
const requireJson = require('./middleware/requireJson')
const taskRoutes = require('./routes/tasks')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(logger)
app.use(requireJson)

app.use('/tasks', taskRoutes)

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Global error handler — must be last
app.use((err, req, res, next) => {
  console.error(err.stack)

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ error: 'Validation failed', details: messages })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Invalid task id "${err.value}"` })
  }

  res.status(500).json({ error: 'Something went wrong' })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })