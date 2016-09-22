require("dotenv").load()
const winston = require("winston")

const port = process.env.PORT || 8080

const server = require("./lib/server")()
server.listen(port, () => {
  winston.info("listening on:", port)
})
