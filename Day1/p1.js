var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
let prec = input[0];
let sum = 0;
input.forEach(element => {
    if(element > prec){
        sum+=1;
    }
    prec = element;
});
console.log(sum);