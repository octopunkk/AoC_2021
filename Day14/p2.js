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

let letters = []; //['B','C','H']
let lettersCount = []; //[1,4,5]
let insertionsToDo = [[polymer[0]+polymer[1],0]]; //[['AB', 8],['BH', 5]]
let pairs = [];

for(let i =0; i<polymer.length-1 ; i++){
    pairs.push(polymer[i]+polymer[i+1])
}
pairs.forEach(pair =>{
    let found = false;
    insertionsToDo.forEach(toDo =>{
        if(toDo[0] === pair){
            toDo[1]+=1;
            found = true;
        }
    })
    if(!found){
        insertionsToDo.push([pair, 1])
    }
})
for(let i =0; i<polymer.length ; i++){
    if(letters.includes(polymer[i])){
        lettersCount[letters.indexOf(polymer[i])]+=1;
    }
    else{
        letters.push(polymer[i]);
        lettersCount.push(1);
    }
}
// console.log(letters);
// console.log(lettersCount);


let insertionsMaker = insertionsToDo => {
    // console.log(letters)
    // console.log(lettersCount)
    // console.log(insertionsToDo)
    let newInsertionsToDo = [];
    insertionsToDo.forEach(toDo => {
        insertions.forEach(insertion => {
            if(toDo[0]===insertion[0]){
                let newInstruction1 = toDo[0][0]+insertion[1];
                let newInstruction2 = insertion[1]+toDo[0][1];
                let found1 = false;
                let found2 = false;
                let foundLetter = false;
                newInsertionsToDo.forEach(newInsertion => {
                    if(newInsertion[0]===newInstruction1){
                        newInsertion[1]+=toDo[1];
                        found1 = true;
                    }
                    if(newInsertion[0]===newInstruction2){
                        newInsertion[1]+=toDo[1];
                        found2 = true;
                    }
                })
                if(!found1){
                    newInsertionsToDo.push([newInstruction1, toDo[1]])
                }
                if(!found2){
                    newInsertionsToDo.push([newInstruction2, toDo[1]])
                }
                if(letters.includes(insertion[1])){
                    lettersCount[letters.indexOf(insertion[1])]+=toDo[1];
                    foundLetter = true;
                }
                if(!foundLetter){
                    letters.push(insertion[1]);
                    lettersCount.push(toDo[1]);
                }
            }
        })
    })
    return newInsertionsToDo
}

for(let i=0; i<40; i++){
    // console.log(`i : ${i}`)
    let newInsertionsToDo = insertionsMaker(insertionsToDo);
    insertionsToDo = newInsertionsToDo.slice();
}

console.log(letters);
console.log(lettersCount);
let max = lettersCount[0];
let min = lettersCount[0];
lettersCount.forEach(num => {
    if(num > max){
        max = num;
    }
    if(num < min){
        min = num;
    }
})

console.log(max - min)