// Validates that :id in the URL is a positive integer before it reaches the route handler.
function validateId(req, res, next) {
  const id = req.params.id
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      error: `Invalid task id "${id}" — id must be a positive integer`,
    })
  }
  next()
}

module.exports = validateId