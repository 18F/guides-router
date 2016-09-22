const expect = require("chai").expect
const url = require("url")

const router = require("../lib/router")
const routes = require("../routes.json")

const route_prefix = Object.keys(routes).find(key => key != "/")

const compare_urls = (a, b) => {
  let url_a = url.parse(a)
  let url_b = url.parse(b)

  expect(url_a.hostname).to.equal(url_b.hostname)

  a_components = url_a.pathname.split("/").filter(component => component)
  b_components = url_b.pathname.split("/").filter(component => component)
  expect(a_components).to.deep.equal(b_components)
}

describe("router", () => {
  it("should not mutate the argument request's url", () => {
    let url = `http://example.com/${route_prefix}`
    let request = { url: url }
    let transformed_url = router(request)
    expect(request.url).to.equal(url)
  })

  it("should return a url pointing at the route for '/' for a request to the root url", () => {
    let request = { url: "http://example.com/" }
    let transformed_url = router(request)
    compare_urls(routes["/"], transformed_url)
  })

  it("should return undefined for a request with a url with a path prefix not in routes.json", () => {
    let request = { url: "http://example.com/dont-make-a-prefix-with-this-name" }
    let transformed_url = router(request)
    expect(transformed_url).to.be.undefined
  })

  it("should return a url for a request's prefix in routes.json", () => {
    let url = `http://example.com/${route_prefix}`
    let request = { url: url }
    let transformed_url = router(request)
    compare_urls(transformed_url, routes[route_prefix])
  })

  it("should return a url for a request's prefix in routes.json with additional path components if present", () => {
    let url = `http://example.com/${route_prefix}/path/to/something`
    let request = { url: url }
    let transformed_url = router(request)
    compare_urls(transformed_url, routes[route_prefix] + "/path/to/something")
  })
})
