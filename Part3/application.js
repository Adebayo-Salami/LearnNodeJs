const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

var app = express();
var server = http.createServer(app);
app.use(bodyParser.json());

let people = {
  people: [
    { name: "Adebayo", ID: 1 },
    { name: "Salami", ID: 2 }
  ]
};
var response = {
  ResponseCode: String,
  ResponseMessage: String,
  ResponseObject: Object
};

server.listen(2000, function() {
  console.log("Server Currently listening on port 2000");
});

app.get("/", function(req, res) {
  res.send("This is the root directory");
});

app.get("/people", function(req, res) {
  var reply = Object.create(response);
  reply.ResponseCode = "00";
  reply.ResponseMessage = "Successful";
  reply.ResponseObject = people;
  res.json(reply);
  res.end();
});

app.get("/getperson/:ID", function(req, res) {
  try {
    res.json(people.people.filter(p => p.ID == req.params.ID));
    res.end();
  } catch (err) {
    reply = Object.create(response);
    reply.ResponseCode = "01";
    reply.ResponseMessage = err.message;
    res.json(reply);
    res.end();
  }
});

app.get("/getpeople", function(req, res) {
  var reply = Object.create(response);
  if (req.body && req.body.ID) {
    let peopleID = Number(req.body.ID);
    console.log("People ID:" + peopleID);
    try {
      if (peopleID > 0) {
        reply.ResponseCode = "00";
        reply.ResponseMessage = "Successful";
        reply.ResponseObject = people.people.filter(p => p.ID === peopleID);
        res.send(reply);
      } else {
        reply.ResponseCode = "02";
        reply.ResponseMessage = "Invalid People ID";
        res.send(reply);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    reply.ResponseCode = "01";
    reply.ResponseMessage = "Invalid Object Passed";
    res.json(reply);
  }
  res.end();
});

app.post("/people", function(req, res) {
  var reply = Object.create(response);
  if (req.body && req.body.Name) {
    people.people.push({ name: req.body.Name });
    reply.ResponseCode = "00";
    reply.ResponseMessage = "Successful";
    reply.ResponseObject = people;
    res.json(reply);
    res.end();
  }

  reply.ResponseCode = "01";
  reply.ResponseMessage = "Failed";
  res.json(reply);
  res.end();
});

app.post("/createUser", function(req, res) {});
