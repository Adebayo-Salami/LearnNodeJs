var express = require("express");
var http = require("http");
var fs = require("fs");

var app = express();
var server = http.createServer(app);

app.get("/", function(req, res) {
  res.send("</h1>Express Works!</h1>");
});

app.get("/task", function(req, res) {
  fs.readFile("db.json", function(error, data) {
    if (error) {
      res.send("Error Occurrred: " + error.message);
      return;
    }

    var task = JSON.parse(data.toString()).tasks;
    res.json(task);
  });
});

// app.listen(3000, function() {
//   console.log("Express Server Is Currently Listening On Port 3000");
// });

server.listen(3000, function() {
  console.log("Express Server Is Currently Listening On Port 3000");
});
