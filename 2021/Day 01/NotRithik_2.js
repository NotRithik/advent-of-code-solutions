// Run solution in NodeJS

const fs = require('fs');

let inputFileName;

if ((process.argv).length > 2) {
  args = process.argv.slice(2);
  if (args[0] === '-f' || args[0] === '--filename') {
    if (args[1].charAt(0) !== '-') {
      inputFileName = args[1];
    } else {
      console.log('Input file specified incorrectly. Using Input_2.txt by default. Specify filename with --filename flag.');
      process.exit(1);
    }
  } else {
    inputFileName = 'Input_2.txt';
    console.log('Input file not specified. Using Input_2.txt by default. Specify filename with --filename flag.');
  }
} else {
  inputFileName = 'Input_2.txt';
  console.log('Input file not specified. Using Input_2.txt by default. Specify filename with --filename flag.');
}

let inputData = fs.readFileSync(inputFileName, 'utf8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('Input file not found.');
      process.exit(1);
    }
    console.log(err);
    process.exit(1);
  }
});

let inputDataArray = inputData.split(/\r?\n/).map((stringNum) => parseInt(stringNum, 10));

let currentWindow, nextWindow;
let increasesInDepth = 0;

currentWindow = inputDataArray[0] + inputDataArray[1] + inputDataArray[2];
nextWindow = inputDataArray[1] + inputDataArray[2] + inputDataArray[3];

for (let i = 1; i < inputDataArray.length - 2; i++) {
  if (nextWindow > currentWindow)
      increasesInDepth++;

  currentWindow = nextWindow;

  nextWindow = nextWindow - inputDataArray[i - 1];
  nextWindow = nextWindow + inputDataArray[i + 2];
}

console.log(increasesInDepth);