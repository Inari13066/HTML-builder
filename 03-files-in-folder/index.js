const fs = require("fs");
const path = require("node:path");

//opening directory
fs.readdir(
  path.resolve("./03-files-in-folder/secret-folder"),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      //going througth every file
      for (let file of files) {
        //if it if a file, opening it to get info
        if (file.isFile()) {
          fs.open(
            path.resolve(`./03-files-in-folder/secret-folder/${file.name}`),
            "r",
            (err, fd) => {
              //getting info
              fs.fstat(fd, function (err, data) {
                //printing info
                console.log(
                  `${file.name.replace(".", " - ")} - ${data.size} bytes`
                );
              });
            }
          );
        }
      }
    }
  }
);

//
