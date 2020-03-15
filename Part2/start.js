var http = require("http");
var events = require("events");

var eventEmitter = new events.EventEmitter();
var server = http.createServer(function(req, res) {
  eventEmitter.emit("onCreateServer", "Bayo Server"); //Emits (sends) an event
  res.end("Server works!!");
});

eventEmitter.on("onCreateServer", function(data) {
  console.log("onCreateServer Event Listener Activated on " + data);
}); //Listening on an event
server.listen(3000, "localhost", function() {
  console.log("Server runnng on port 3000");
});
