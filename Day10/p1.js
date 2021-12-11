var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n').map(line => line.split(''));
scoreCount = 0;
input.forEach(line => {
    let open = [];
    let found = false;
    line.forEach(char => {
        if(char === '(' || char === '{' || char === '[' || char === '<'){
            open.push(char);
        }
        else if(char === ')'){
            if(open[open.length-1]==='('){
                open.pop();
            }
            else if(!found){
                scoreCount+=3;
                found = true;
            }
        }
        else if(char === '}'){
            if(open[open.length-1]==='{'){
                open.pop();
            }
            else if(!found){
                scoreCount+=1197;
                found = true;
            }
        }
        else if(char === ']'){
            if(open[open.length-1]==='['){
                open.pop();
            }
            else if(!found){
                scoreCount+=57;
                found = true;
            }
        }
        else if(char === '>'){
            if(open[open.length-1]==='<'){
                open.pop();
            }
            else if(!found){
                scoreCount+=25137;
                found = true;
            }
        }
    })
});
console.log(scoreCount)
