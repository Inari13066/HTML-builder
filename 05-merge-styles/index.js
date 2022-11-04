const { readdir } = require("node:fs/promises");
const { resolve, join, extname } = require("node:path");
const fs = require("fs");

async function styleDirectory() {
  //create empty file or make existing file empty
  fs.writeFile(
    resolve(join(__dirname, "project-dist", "bundle.css")),
    "",
    function (err) {
      if (err) {
        return console.error(err);
      }
    }
  );

  //open style dir
  const files = await readdir(resolve(join(__dirname, "styles")), {
    withFileTypes: true,
  });
  for (const file of files) {
    if (
      file.isFile() &&
      extname(resolve(join(__dirname, "styles", file.name))) == ".css"
    ) {
      fs.readFile(
        resolve(join(__dirname, "styles", file.name)),
        (err, buff) => {
          // if any error
          if (err) {
            console.error(err);
            return;
          }
          fs.appendFile(
            resolve(join(__dirname, "project-dist", "bundle.css")),
            `${buff.toString()}\n`,
            function (err) {
              if (err) return console.log(err);
            }
          );
        }
      );
    }
  }
}

styleDirectory().catch(console.error);
