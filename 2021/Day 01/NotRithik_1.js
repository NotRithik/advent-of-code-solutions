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

let increasesInDepth = 0;
for (let i = 0; i < inputDataArray.length - 1; i++) {
    if (inputDataArray[i+1] > inputDataArray[i])
        increasesInDepth++;
}

console.log(increasesInDepth);