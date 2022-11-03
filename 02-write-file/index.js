
const process = require('node:process');
const path = require('node:path');
const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

//create empty file or make existing file empty
fs.writeFile(path.resolve('./02-write-file/text.txt'), "", function (err) {
  if (err) {
     return console.error(err);
  }  
});

var rs = fs.createReadStream(path.resolve('./02-write-file/text.txt'));
console.log("Start!");

rl.on('line', (input) => {
  if(input == "exit") {
    rl.close();
  } else {
    fs.appendFile(path.resolve('./02-write-file/text.txt'), `${input}\n`, function (err) {
      if (err) return console.log(err);
    });
  }
});

process.on('exit', () => {
    console.log('Bye!');
  });