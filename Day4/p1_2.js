var fs = require('fs');
var text = fs.readFileSync("./inputTest.txt", 'utf-8');
var input = text.split('\n');
var numbers = input[0].split(',');
var boards = input.slice(1);
var boardsStr = text.substring(numbers.length);

// console.log(numbers);
// numbers.forEach(number => {
//     boardsStr = boardsStr.replaceAll(number, ' #');
// });

const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replace('dog', 'monkey'));