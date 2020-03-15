const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bestmumeverconnect123",
  database: "edureka",
  multipleStatements: true
});

mysqlConnection.connect(err => {
  if (!err) {
    console.log("Connection Successful");
  } else {
    console.log("Connection Failed | Error: " + err);
    return;
  }
});

module.exports = mysqlConnection;
