var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split(',');
let crabMax = 0;
crabs = input.map(crab => {
    if(crab > crabMax){
        crabMax = crab;
    }
    return Number(crab);
});
console.log(crabs);

let bestFuel = 99999999999999999999999999;

for(let i = 0; i<crabMax; i++){
    position = i;
    let fuel = 0;
    crabs.forEach(crab => {
        let n = (Math.abs(crab-position));
        fuel+=Math.ceil(((n*(n+1))/2));
    })
    if(fuel < bestFuel){
        bestFuel = fuel;
    }
}
       
console.log(bestFuel);

