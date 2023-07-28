// create web server
// create a route for /comments
// send back a response with the correct content type and status code

// import http module
var http = require("http");
// import fs module
var fs = require("fs");
// import path module
var path = require("path");
// import url module
var url = require("url");

// create server
var server = http.createServer(function(request, response) {
  // get the path
  var pathname = url.parse(request.url).pathname;
  // get the extension
  var extension = path.extname(pathname);
  // get the content type
  var contentType = getContentType(extension);
  // get the status code
  var statusCode = getStatusCode(pathname);
  // get the content
  var content = getContent(pathname);
  // send the response
  sendResponse(response, contentType, statusCode, content);
});

// start server
server.listen(3000);

// get content type
function getContentType(extension) {
  switch (extension) {
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".html":
      return "text/html";
    default:
      return "text/plain";
  }
}

// get status code
function getStatusCode(pathname) {
  switch (pathname) {
    case "/comments":
      return 200;
    case "/bad-request":
      return 400;
    case "/forbidden":
      return 403;
    case "/internal-server-error":
      return 500;
    case "/not-found":
      return 404;
    case "/not-implemented":
      return 501;
    case "/service-unavailable":
      return 503;
    default:
      return 200;
  }
}

// get content
function getContent(pathname) {
  switch (pathname) {
    case "/comments":
      return JSON.stringify([