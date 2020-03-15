var express = require("express");
var routes = require("./routes");
var http = require("http");
var path = require("path");
var urlencoded = require("url");
var bodyParser = require("body-parser");
var json = require("json");
var logger = require("logger");
var methodOverride = require("method-override");

var nano = require("nano")("http://localhost:5984"); //nano is used to connect to the apache couchdb server
var db = nano.use("address"); //Selecting the database to use
var app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
//app.use(express.static(path.join(__dirname, "public")));

app.get("/", routes.index);

app.post("/createdb", function(request, response) {
  nano.db.create(request.body.dbname, function(error) {
    if (error) {
      response.send(
        "Error Creating Database" +
          request.body.dbname +
          " | Error Message:" +
          error.message
      );
      return;
    }

    response.send("Database" + request.body.dbname + " created successfully");
  });
});

app.post("/new_contact", function(request, response) {
  var name = request.body.name;
  var phone = request.body.phone;

  db.insert({ name: name, phone: phone, crazy: true }, phone, function(
    error,
    body,
    header
  ) {
    if (error) {
      response.send("Error Creating New Contact");
      return;
    }

    response.send("Contact Created Successfully");
  });
});

app.post("/view_contact", function(request, response) {
  var alldoc = "Following are the contacts";
  db.get(request.body.phone, { revs_info: true }, function(error, body) {
    if (error) {
      console.log("Error Occurred while fetching data : " + error.message);
      return;
    }

    console.log(body);
    if (body) {
      alldoc += "<br/>Name: " + body.name + "<br/>Phone: " + body.phone;
    } else {
      alldoc = "No Records Found";
    }

    response.send(alldoc);
  });
});

app.post("/delete_contact", function(req, res) {
  db.get(req.body.phone, { revs_info: true }, function(err, body) {
    if (err) {
      res.send("Contact Does Not Exist");
      return;
    }
    db.destroy(body.phone, body._rev, function(error, body) {
      if (error) {
        res.send("An Error Occurred While Deleting Contact " + error.message);
        return;
      }

      res.send("Contact Deleted Successfully");
    });
  });
});

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express Server Listening On Port " + app.get("port"));
});
