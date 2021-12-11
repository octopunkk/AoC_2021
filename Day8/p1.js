var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');

const lines = input.map((text) => {
    const matches = text.match(/[|] (\w+) (\w+) (\w+) (\w+)/);
    return [matches[1], matches[2], matches[3], matches[4],]
  });

let sum = 0;
lines.forEach(line => {
    line.forEach(segment => {
        if(segment.length === 2 || segment.length === 3 || segment.length === 4 || segment.length === 7){
            sum+=1;
        }
    });
});
console.log(sum);