const path = require('node:path');
const fs = require('node:fs');

const rr = fs.createReadStream(path.resolve('./01-read-file/text.txt'));

rr.on('data', (chunk) => {
    console.log(`${chunk}`);
  });
