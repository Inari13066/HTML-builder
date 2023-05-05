const { mkdir, readdir, copyFile, readFile } = require("node:fs/promises");
const { writeFile, appendFile } = require("node:fs");
const { resolve, join, extname } = require("node:path");

async function makeDirectory() {
    const projectFolder = resolve(join(__dirname, "project-dist"));
    const dirCreation = await mkdir(projectFolder, { recursive: true });
    const components = await readdir(resolve(join(__dirname, "components")));
    let buffer = await readFile(resolve(join(__dirname, "template.html")), (err, initialData) => {});
    let data = buffer.toString();

    let counter = 0;
    console.log(data);

    while (counter != components.length) {
        let index = data.search("{");
        let endIndex = data.search("}");
        let fileName = data.slice(index + 2, endIndex);
        let fileData = await readFile(resolve(join(__dirname, "components", `${fileName}.html`)), (err, newData) => {});
        data = data.slice(0, index) + fileData + data.slice(endIndex + 2);
        counter++;
    }

    writeFile(resolve(join(__dirname, "project-dist", "index.html")), data, (err) => {
        if (err) {
            console.error(err);
        }
    });

    return dirCreation;
}

async function makeDirectoryAssets() {
    const projectFolder = resolve(join(__dirname, "project-dist", "assets"));
    const dirCreation = await mkdir(projectFolder, { recursive: true });
    const folders = ["fonts", "img", "svg"];

    for (const folder of folders) {
        const files = await readdir(resolve(join(__dirname, "assets", folder)));
        await mkdir(resolve(join(__dirname, "project-dist", "assets", folder)), { recursive: true });

        for (const file of files) {
            copyFile(
                join(__dirname, "assets", folder, file),
                resolve(join(__dirname, "project-dist", "assets", folder, file))
            );
        }
    }

    return dirCreation;
}

async function styleDirectory() {
    //create empty file or make existing file empty
    writeFile(resolve(join(__dirname, "project-dist", "style.css")), "", function (err) {
        if (err) {
            return console.error(err);
        }
    });

    //open style dir
    const files = await readdir(resolve(join(__dirname, "styles")), {
        withFileTypes: true,
    });
    for (const file of files) {
        if (file.isFile() && extname(resolve(join(__dirname, "styles", file.name))) == ".css") {
            let buff = await readFile(resolve(join(__dirname, "styles", file.name)));
            appendFile(resolve(join(__dirname, "project-dist", "style.css")), `${buff.toString()}\n`, function (err) {
                if (err) return console.log(err);
            });
        }
    }
}

makeDirectory().catch(console.error);
makeDirectoryAssets().catch(console.error);
styleDirectory().catch(console.error);
