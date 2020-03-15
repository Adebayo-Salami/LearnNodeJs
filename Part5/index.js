const mongoDbConnection = require("./connection");
const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const CourseController = require("./controllers/courses");
const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  expressHandlebars({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir: __dirname + "/views/layouts",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);

app.get("/", (req, res) => {
  //res.send("<h1>Server is up and running</h1>");
  res.render("index", {});
  //res.end();
});

app.use("/course", CourseController);

app.listen(3000, () => {
  console.log("Server Started");
});
