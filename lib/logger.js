const winston = require("winston")

const logProxy = (requestURL, targetURL) => {
  winston.log("info", `${prefix()} ${requestURL} -> ${targetURL}`)
}

const log404 = (requestURL) => {
  winston.log("info", `${prefix()} ${requestURL} -> 404 Not Found `)
}

const logError = (error) => {
  winston.log("error", error)
}

const prefix = () => `[${(new Date()).toISOString()}]`

module.exports = {
  logProxy,
  log404,
  logError,
}
