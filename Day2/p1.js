var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
let position = 0;
let depth = 0;
input.forEach(element => {
    const command = element.split(" ");

    switch (command[0]){
        case 'up' :
            depth -= parseInt(command[1]);
        break;
        case 'down' :
            depth += parseInt(command[1]);
        break;
        case 'forward' :
            position += parseInt(command[1]);
        break;
    }
});
console.log(position);
console.log(depth);
console.log(depth * position);