// In-memory "database" — resets every time the server restarts.
let tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build a REST API', completed: false },
]

let nextId = 3

module.exports = { tasks, getNextId: () => nextId++ }