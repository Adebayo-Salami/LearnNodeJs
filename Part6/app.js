//importing modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const apiRouter = require("./Routes/ApiRouter");
//setting up app server
var app = express();
app.listen(3000, () => {
  console.log("Server currently listening on port 3000");
});

//setting up middleware
app.use(bodyParser.json());
app.use(cors());

//setting up database connection
mongoose.connect("mongodb://localhost:27017/contactlist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to database mongodb @ 27017");
});
mongoose.connection.on("error", err => {
  if (err) {
    console.log("Error occurred during db connection: " + err);
  }
});

//static files
app.use(express.static(path.join(__dirname, "Public")));

//setting up request hadnling
// app.get("/", (req, res) => {
//   res.send("Something");
// });
app.use("/api", apiRouter);
