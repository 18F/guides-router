const http = require("http")
const request = require("request")
const url = require("url")

const logger = require("./logger")
const router = require("./router")

const server = () => {
  return http.createServer((request, response) => {
    try {
      let target = router(request)
      if (target) {
        logger.logProxy(request.url, target.format())
        proxy(response, target)
      } else {
        logger.log404(request.url)
        render404(response)
      }
    } catch (error) {
      render500(error, response)
    }
  })
}

const proxy = (response, target) => {
  request(target.format()).pipe(response)
}

const render404 = (response) => {
  response.statusCode = 404
  response.statusMessage = "Not Found"
  response.write("404 Not Found")
  response.end()
}

const render500 = (error, response) => {
  logger.logError(error)
  response.statusCode = 500
  response.statusMessage = "Internal server error"
  response.write("500 Internal server error")
  response.end()
}

module.exports = server
