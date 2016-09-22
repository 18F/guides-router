const url = require("url")
const routes = require("../routes.json")

/*
  Given a request, this method will return a url object representing the url to
  which that request should be proxied
*/
const router = (request) => {
  let request_url = url_from_request(request)
  let prefix = path_prefix(request_url)
  let suffix = path_suffix(request_url)
  let target = routes[prefix]

  if (target) {
    return append_suffix(url.parse(target), suffix)
  } else {
    return undefined
  }
}

const url_from_request = request => url.parse(request.url)

const path_components = url => {
  return url.pathname.split("/").filter(component => component)
}

const path_prefix = url => {
  let components = path_components(url)
  return (components[0] || "/").toLowerCase()
}

const path_suffix = url => {
  let components = path_components(url)
  return components.slice(1).join("/").toLowerCase()
}

const append_suffix = (url, suffix) => {
  let pathname = url.pathname

  if (pathname.slice(-1) == "/") {
    pathname = [url.pathname, suffix].join("")
  } else {
    pathname = [url.pathname, suffix].join("/")
  }

  let new_url = Object.assign({__proto__: url.__proto__}, url)
  new_url.pathname = pathname
  return new_url
}

module.exports = router
