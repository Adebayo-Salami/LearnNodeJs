const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  ID: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const Contact = (module.exports = mongoose.model("contact", ContactSchema));
