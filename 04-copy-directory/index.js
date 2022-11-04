const { mkdir, readdir } = require("node:fs/promises");
const { copyFile, constants } = require("node:fs/promises");
const { resolve, join } = require("node:path");

async function makeDirectory() {
  const projectFolder = resolve(join(__dirname, "files-copy"));
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  //   console.log(dirCreation);
  return dirCreation;
}

async function copyDirectory() {
  const files = await readdir(resolve(join(__dirname, "files")));
  for (const file of files) {
    // console.log(__dirname, file);
    copyFile(
      join(__dirname, "files", file),
      resolve(join(__dirname, "files-copy", file))
    );
  }
}

makeDirectory().catch(console.error);
copyDirectory().catch(console.error);
