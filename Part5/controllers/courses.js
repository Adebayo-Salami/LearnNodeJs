const express = require("express");
const mongoose = require("mongoose");

const Router = express.Router();
const CourseModel = mongoose.model("Course");

Router.get("/add", (req, res) => {
  res.render("add-course", {});
});

var generateID = async function() {
  var index = 1;

  await CourseModel.find((error, docs) => {
    if (!error) {
      if (docs != null) {
        docs.forEach(item => {
          index = item.courseID + 1;
        });
      }
    } else {
      console.log(error);
    }
  });

  return index;
};

Router.post("/add", async (req, res) => {
  var course = new CourseModel();
  course.courseID = await generateID();
  course.courseName = req.body.courseName;
  course.courseFee = req.body.courseFee;
  course.courseDuration = req.body.courseDuration;
  course.save((error, document) => {
    if (error) {
      console.log("Exception Occurred while saving schema " + error);
      res.send("An error occurred while saving <br/>" + JSON.parse(req.body));
    } else {
      console.log("Save Successful");
      res.redirect("/course/list");
    }
  });
});

Router.get("/list", (req, res) => {
  console.log(req.body.alert);
  CourseModel.find((error, docs) => {
    if (error) {
      res.send("An Error Occurred: " + error);
    } else {
      //console.log(docs);
      //res.send("<h1>All is well</h1>");
      res.render("list", { data: docs });
    }
  });
});

Router.post("/delete", (req, res) => {
  console.log("It got here");
  var docID = req.body.docID;
  console.log(docID);
  var course = CourseModel.findOne({ courseID: docID }, function(err, item) {
    if (err) {
      console.log(err);
      res.send("Delete Failed: " + err);
      res.end();
    }

    console.log("Got 1");
    console.log(item);
    item.remove();
    res.redirect("/course/list");
  });
});

module.exports = Router;
