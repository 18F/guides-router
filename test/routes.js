const expect = require("chai").expect
const url = require("url")

const routes = require("../routes.json")

describe("routes.json", () => {
  it("should have a root url for the '/' key", () => {
    expect(routes["/"]).to.not.be.null
  })

  it("should have a valid URL with a hostname for each key", () => {
    Object.keys(routes).forEach(key => {
      let route_url = url.parse(routes[key])
      expect(route_url.hostname).to.not.be.null
    })
  })
})
