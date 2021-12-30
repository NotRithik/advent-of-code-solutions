// Run solution in NodeJS

const fs = require('fs');

let inputFileName;

if ((process.argv).length > 2) {
  args = process.argv.slice(2);
  if (args[0] === '-f' || args[0] === '--filename') {
    if (args[1].charAt(0) !== '-') {
      inputFileName = args[1];
    } else {
      console.log('Input file specified incorrectly. Using Input_1.txt by default. Specify filename with --filename flag.');
      process.exit(1);
    }
  } else {
    inputFileName = 'Input_1.txt';
    console.log('Input file not specified. Using Input_1.txt by default. Specify filename with --filename flag.');
  }
} else {
  inputFileName = 'Input_1.txt';
  console.log('Input file not specified. Using Input_1.txt by default. Specify filename with --filename flag.');
}

let inputData = fs.readFileSync(inputFileName, 'utf8', (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('Input file not found.');
      process.exit(1);
    }
    console.log(err);
    process.exit(1);
  }
});

let inputLines = inputData.split(/\r?\n/).map((inputLine) => {
  let inputPair = inputLine.split(' ');
  return [inputPair[0], parseInt(inputPair[1], 10)];
});

let depth = 0, horizontalPos = 0;

for (let i = 0; i < inputLines.length; i++) {
  inputLine = inputLines[i];
  switch (inputLine[0]) {
    case 'forward':
      horizontalPos += inputLine[1];
      break;
    case 'down':
      depth += inputLine[1];
      break;
    case 'up':
      depth -= inputLine[1];
      break;
  }
}

console.log(depth * horizontalPos);
