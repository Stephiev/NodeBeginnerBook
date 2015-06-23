var http = require("http");
var url  = require("url"); // provides methods which allow us to extract the different parts of a URL

// like e.g. the requested path and query string
// the route parameter is a function that takes a pathname
// it comes from our router.js file, it's sent into here form our index.js file
function start(route, handle) {
  function onRequest(request, response) {
    // var postData = "";
    var pathname = url.parse(request.url).pathname; // Find out which URL path the browser requested
    console.log("Request for " + pathname + " received.");

    // request.setEncoding("utf8");

    // request.addListener("data", function(postDataChunk) {
    //   postData += postDataChunk;
      // console.log("Received POST data chink '" + postDataChunk + "'.");
    // });

    // request.addListener("end", function() {
    route(handle, pathname, response, request);
    // });

    // response.writeHead(200, {"Content-Type": "text/plain"});
    // var content = route(handle, pathname);
    // response.write(content);
    // response.end();
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started");
};

exports.start = start;
