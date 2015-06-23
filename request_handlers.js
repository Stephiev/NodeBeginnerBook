// var exec = require("child_process").exec;
var querystring = require("querystring");
var fs          = require("fs");
var formidable  = require("formidable");

function start(response) {
  console.log("request handler 'start' was called.");

  var body = '<!DOCTYPE html>'+
      '<html>'+
        '<head>'+
          '<meta http-equiv="Content-Type" content="text/html; '+
          'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
          '<form action="/upload" enctype="multipart/form-data" '+
          'method="post">'+
          '<input type="file" name="upload" multiple="multiple">'+
          '<input type="submit" value="Upload file" />'+
          '</form>'+
        '</body>'+
      '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();

  // var content = "empty";

  // exec("find /",
  //   { timeout: 10000, maxBuffer: 20000*1024 },
  //   function(error, stdout, stderr) {
  //   response.writeHead(200, {"Content-Type": "text/plain"});
  //   response.write(stdout);
  //   response.end();
  //   // content = stdout;
  // });

  // return content;

  // function sleep(milliSeconds) { // adding a blocking operation
  //   var startTime = new Date().getTime();
  //   while (new Date().getTime() < startTime + milliSeconds);
  // }

  // sleep(10000);
  // return "Hello Start";
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    fs.rename(files.upload.path, "./tmp/test.png", function(error) {
      if (error) {
        fs.unlink("./tmp/test.png");
        fs.rename(files.upload.path, "./tmp/test.png");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image: <br/>");
    response.write("<img src='/show' />");
    // response.write("You've sent the text: " + querystring.parse(postData).text);
    response.end();
    // return "Hello Upload";

  });
  // response.writeHead(200, {"Content-Type": "text/plain"});
  // response.write("received image: <br/>");
  // response.write("<img src='/show' />");
  // // response.write("You've sent the text: " + querystring.parse(postData).text);
  // response.end();
  // // return "Hello Upload";
}

function show(response) {
  console.log("Request handler 'show' was called");
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("./tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;

