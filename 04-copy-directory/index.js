const { mkdir, readdir } = require("node:fs/promises");
const { copyFile } = require("node:fs/promises");
const { unlink } = require("node:fs");
const { resolve, join } = require("node:path");

async function makeDirectory() {
    const projectFolder = resolve(join(__dirname, "files-copy"));

    const dirCreation = await mkdir(projectFolder, { recursive: true });
    //   console.log(dirCreation);
    return dirCreation;
}

async function copyDirectory() {
    const files = await readdir(resolve(join(__dirname, "files")));
    const oldFiles = await readdir(resolve(join(__dirname, "files-copy")));
    for (const file of files) {
        // console.log(__dirname, file);
        copyFile(join(__dirname, "files", file), resolve(join(__dirname, "files-copy", file)));
    }
    for (const file of oldFiles) {
        if (!files.includes(file)) {
            unlink(resolve(join(__dirname, "files-copy", file)), (err) => {
                if (err) console.log(err);
            });
        }
    }
}

makeDirectory().catch(console.error);
copyDirectory().catch(console.error);

