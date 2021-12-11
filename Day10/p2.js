var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n').map(line => line.split(''));

let correctLines = [];
input.forEach(line => {
    let open = [];
    let incorrect = false;
    line.forEach(char => {
        
        if(char === '(' || char === '{' || char === '[' || char === '<'){
            open.push(char);
        }
        else if(char === ')'){
            if(open[open.length-1]==='('){
                open.pop();
            }
            else {
                incorrect = true;
            }
        }
        else if(char === '}'){
            if(open[open.length-1]==='{'){
                open.pop();
            }
            else {
                incorrect = true;
            }
        }
        else if(char === ']'){
            if(open[open.length-1]==='['){
                open.pop();
            }
            else {
                incorrect = true;
            }
        }
        else if(char === '>'){
            if(open[open.length-1]==='<'){
                open.pop();
            }
            else {
                incorrect = true;
            }
        }
    })
    if(!incorrect){
        correctLines.push(line);
    }
});

let allScores = [];
correctLines.forEach(line => {
    let open = [];
    let score = 0;
    line.forEach(char => { 
        if(char === '(' || char === '{' || char === '[' || char === '<'){
            open.push(char);
        }
        if(char === ')' || char === '}' || char === ']' || char === '>'){
            open.pop();
        }
    });
    console.log(open);
    for(let i = open.length-1; i>=0; i--){
        let value = 0;
        let char = open[i];
        if(char === '('){
            value =1;
        }
        if(char === '['){
            value =2;
        }
        if(char === '{'){
            value =3;
        }
        if(char === '<'){
            value =4;
        }
        score = score*5 + value;
    }
    allScores.push(score);
});
let sortedScores = allScores.sort((a,b) => b-a);
let index = (sortedScores.length-1)/2;
console.log(sortedScores[index]);
