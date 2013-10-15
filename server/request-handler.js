/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var querystring = require("querystring");
var messages = {
  results: []
};
// var messages = require('./message-data.js');
var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var message, statusCode = 200;
  var headers = defaultCorsHeaders;
  // console.log("request is: ", request);
  // console.log("response is: ", response);
  headers['Content-Type'] = "text/plain";
  if (request.method === "OPTIONS") {
    console.log('options');
    message = "options";
  } else if (request.method === "GET") {
    console.log('get');
    message = messages;
  } else if (request.method === "POST"){


    request.on('data', function(data){
      // var buffer = request.pipe(response);
      message = querystring.parse(querystring.escape(data));
      message = JSON.stringify(Object.keys(message)[0]);
      console.log("message is: ", message);
      messages.results.push(message);
    });
  }
  response.writeHead(statusCode, headers);
  response.end(message);
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.handleRequest = handleRequest;