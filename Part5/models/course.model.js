const mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
  courseID: {
    type: Number,
    require: "Reuired"
  },
  courseName: {
    type: String,
    require: "Required"
  },
  courseDuration: {
    type: String
  },
  courseFee: {
    type: String
  }
});

mongoose.model("Course", CourseSchema);
