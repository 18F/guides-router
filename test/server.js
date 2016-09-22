const expect = require("chai").expect
const nock = require("nock")
const request = require('supertest');
const url = require("url")
const winston = require("winston")

const routes = require("../routes.json")
const server = require("../lib/server")()

const routePrefix = Object.keys(routes).find(key => key != "/")

describe("server", () => {
  before(() => {
    winston.level = "error"
  })

  it("should proxy to the root url properly", (done) => {
    route = url.parse(routes["/"])

    nock(`${route.protocol}//${route.hostname}`)
      .get(route.path)
      .reply(200, "Root URL content!")

    request(server)
      .get("/")
      .expect((res) => {
        expect(res.text).to.equal("Root URL content!")
      })
      .expect(200, done)
  })

  it("should proxy paths with a prefix to the proper destination", (done) => {
    route = url.parse(routes[routePrefix])

    nock(`${route.protocol}//${route.hostname}`)
      .get(route.path)
      .reply(200, "Prefix URL content!")

    request(server)
      .get(`/${routePrefix}`)
      .expect((res) => {
        expect(res.text).to.equal("Prefix URL content!")
      })
      .expect(200, done)
  })

  it("should proxy paths with a prefix and additional path components to the proper destination", (done) => {
    route = url.parse(routes[routePrefix])

    nock(`${route.protocol}//${route.hostname}`)
      .get(route.path + "path/to/something")
      .reply(200, "Prefix URL content!")

    request(server)
      .get(`/${routePrefix}/path/to/something`)
      .expect((res) => {
        expect(res.text).to.equal("Prefix URL content!")
      })
      .expect(200, done)
  })

  it("should respond with a 404 if the prefix is invalid", (done) => {
    request(server)
      .get("/invalid-prefix")
      .expect(404, done)
  })
})
