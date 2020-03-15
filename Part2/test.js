var fs = require("fs");

fs.appendFile(
  "file.txt",
  " Am going to mark my name as one of the greatest name in the tech world",
  function(error) {
    if (!error) {
      fs.readFile("file.txt", function(err, data) {
        if (!err) {
          console.log(data.toString());
        }
      });
    }
  }
);
