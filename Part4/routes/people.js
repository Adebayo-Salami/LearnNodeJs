const express = require("express");
const mysqlConnection = require("../connection");
const Router = express.Router();

Router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM PEOPLE", (err, rows, fields) => {
    if (err) {
      res.send("Error Occurred: " + err);
      console.log("Error Occurred: " + err);
    }
    res.send(rows);
  });
});

module.exports = Router;
