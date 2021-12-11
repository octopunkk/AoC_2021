var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split(',');
fishes = input.map(fish => {
    return Number(fish);
});
let DAYS = 256;

//9 états possibles pour un poisson 
//compter cb de chaque état 
//bcp moins de valeurs a stocker !

//init de l'array des etats : 
let fishState = [0,0,0,0,0,0,0,0,0];
fishes.forEach(fish => {
    fishState[fish]+=1;
})
console.log(fishState);

for(i = 0; i < DAYS; i++){
    let tmp = fishState[0];
    for(let i = 0; i<9; i++){
        fishState[i]=fishState[i+1];
    }
    fishState[8]=tmp;
    fishState[6]+=tmp;
}
const reducer = (previousValue, currentValue) => previousValue + currentValue;
console.log(fishState.reduce(reducer));