const express = require('express')
const logger = require('./middleware/logger')
const requireJson = require('./middleware/requireJson')
const taskRoutes = require('./routes/tasks')

const app = express()
const PORT = 5000

app.use(express.json())      // parse JSON request bodies
app.use(logger)               // log every request
app.use(requireJson)          // reject bad Content-Type on POST/PUT

app.use('/tasks', taskRoutes) // mount all task routes under /tasks

// 404 handler — for any route that didn't match above (supplementary task #3)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Global error handler — must be last, and must have 4 arguments
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})