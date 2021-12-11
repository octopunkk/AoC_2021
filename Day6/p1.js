var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split(',');
fishes = input.map(fish => {
    return Number(fish);
});
console.log(fishes);
let DAYS = 80;
for(i = 0; i < DAYS; i++){
    let newFishes = [];
    fishes.forEach(fish => {
        if(fish === 0){
            newFishes.push(8);
            newFishes.push(6);
        }
        else{
            newFishes.push(fish-1);
        }
    });
    fishes = newFishes.slice();
}
console.log(fishes.length);
