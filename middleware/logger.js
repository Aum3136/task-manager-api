// Logs every incoming request's method, URL, and timestamp.
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
  next()
}

module.exports = logger