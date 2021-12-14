var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
let polymer = input[0].replace('\r','');
let insertions = [];

input.forEach(line => {
    const matchesInsertion = line.match(/(\w+) -> (\w)/);
    if(matchesInsertion){
        insertions.push([matchesInsertion[1],matchesInsertion[2]])
    }
});

let insert = polymer => {
    let newPolymer = [];
    let pairs = [];
    for(let i =0; i<polymer.length-1 ; i++){
        pairs.push(polymer[i]+polymer[i+1])
    }
    pairs.forEach(pair => {
        insertions.forEach(insertion => {
            if(pair === insertion[0]){
                newPolymer.push(pair[0]+insertion[1])
            }
        })
    });
    newPolymer.push(polymer[polymer.length-1])
    return newPolymer.join('')
}

for(let i=0; i<40; i++){
    let newPolymer = insert(polymer);
    polymer = newPolymer;
}

let letters = [];
let letterCount = [];
polymer.split('').forEach(letter=>{
    if(letters.includes(letter)){
        letterCount[letters.indexOf(letter)]+=1;
    }
    else{
        letters.push(letter);
        letterCount.push(1)
    }
})
let max = letterCount[0];
let min = letterCount[0];
letterCount.forEach(num => {
    if(num > max){
        max = num;
    }
    if(num < min){
        min = num;
    }
})

console.log(max - min)