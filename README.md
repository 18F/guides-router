# Getting Started

`guides-router` is a simple utility that forwards requests for 18F guides to the appropriate guide based on the path prefix.

For example, requests to `/accessibility` are forwarded to the guide on building accessible web applications.

## Setup

The get started, clone this project, install the dependencies, and run `npm start`:

```shell
$ git clone git@github.com:18F/guides-router.git
$ npm install
$ npm start
```

By default, the router will listen on port 8080, so you can access it at `http://localhost:8080/`.
If you want to use a different port, set the `PORT` variable in your shell or in `.env.local`

```
PORT=5000
```

## Tests

To run the tests, run `npm test`

# Adding a site

First, build your guide and deploy it to [Federalist](federalist.18f.gov).
After that, you'll need to add it to the `routes.json` file here to have it forwarded correctly.

Before you get started, you'll need a "route prefix". This is what will appear after the URL when your guide is visited. For example, if your prefix is `dev-environment`, your guide will appear at `/dev-environment/` and other pages will appear after that, e.g. `/dev-environment/environments/`.

After you have a guide on Federalist and a route prefix, set the route prefix as you `baseurl` in your Federalist site's "custom configuration".
You can find this under the "Settings" tab in the Federalist dashboard for your site.

```YAML
baseurl: /dev-environments
```

Next, add the URL for your site in Federalist's S3 bucket to the `routes.json` file.
This can also be found in the "Settings" tab on your site's Federalist dashboard.

You should have something like this:

```json
"dev-environments": "http://federalist.18f.gov.s3-website-us-east-1.amazonaws.com/site/18F/dev-environment/"
```

Once that is done, re-deploy the router and your guide should be forwarded correctly.
