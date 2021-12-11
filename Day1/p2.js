var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
let sum1 = parseInt(input[0])+parseInt(input[1])+parseInt(input[2]);
let sum2 = parseInt(input[1])+parseInt(input[2])+parseInt(input[3]);
let sum3 = parseInt(input[2])+parseInt(input[3])+parseInt(input[4]);
let ans = 0;

for(let index = 2; index < input.length -2; index++){
    if(sum2 > sum1){
        ans+=1;
    }
    sum1=sum2;
    sum2=sum3;
    sum3=parseInt(input[index])+parseInt(input[index+1])+parseInt(input[index+2]);
};
if(sum2 > sum1){
    ans+=1;
}
if(sum3 > sum2){
    ans+=1;
}

console.log(ans);