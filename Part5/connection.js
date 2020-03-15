const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/edureka",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      console.log("Connection Failed: " + err);
    } else {
      console.log("Connection Successful");
    }
  }
);

const Course = require("./models/course.model");
