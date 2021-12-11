var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');

const output = input.map((text) => {
    const matches = text.match(/[|] (\w+) (\w+) (\w+) (\w+)/);
    return [matches[1], matches[2], matches[3], matches[4],]
});
const lines = input.map((text) => {
    const matches = text.match(/(\w+)/g);
    return matches.slice(0,10);
});

let lettersMapping = [];
lines.forEach(line => {
    let nbOfEach = new Array(7).fill(0); //[a, b, c, d, e, f, g]
    line.forEach(number => {
        let segments = number.split('');
        segments.forEach(segment => {
            nbOfEach[segment.codePointAt(0) - 'a'.codePointAt(0)] += 1;
        });
    });
    let lettersInOrder = [0,0,0,0,0,0,0]; //[a, g, f, b, d, c, e] par exemple, ce qui correspond à a=A, g=B, f=C, etc

    // lettersInOrder[1] = String.fromCodePoint('a'.codePointAt(0) + nbOfEach.findIndex((nb) => nb === 6));

    for(let i = 0; i<7; i++){
        if(nbOfEach[i]===6){
            //c'est le B
            lettersInOrder[1]=String.fromCodePoint('a'.codePointAt(0)+i);
        }
        else if(nbOfEach[i]===4){
            //c'est le E
            lettersInOrder[4]=String.fromCodePoint('a'.codePointAt(0)+i);
        }
        else if(nbOfEach[i]===9){
            //c'est le F
            lettersInOrder[5]=String.fromCodePoint('a'.codePointAt(0)+i);
        }
    }

    let display1, display7, display4, display8;
    line.forEach(number => {
        if(number.length === 2){
            //c'est l'affichage du 1
            display1 = number;
        }
        else if(number.length === 3){
            //c'est l'affichage du 7
            display7 = number;
        }
        else if(number.length === 4){
            //c'est l'affichage du 4
            display4 = number;
        }
        else if(number.length === 7){
            //c'est l'affichage du 8
            display8 = number;
        }
    });
    for(let i=0; i<3; i++){
        let ok = false;
        for(let j=0; j<2; j++){
            if(display1[j]===display7[i]){
                ok = true;
            }
        }
        // let ok = !display7.includes(display1[i]);
        if(!ok){
            lettersInOrder[0]=display7[i];
        }
    }
    for(let i = 0; i<2; i++){
        if(display1[i]!==lettersInOrder[5]){
            lettersInOrder[2]=display1[i];
        }
    }
    for(let i = 0; i<4; i++){
        if(display4[i]!==lettersInOrder[1] && display4[i]!==lettersInOrder[2] && display4[i]!==lettersInOrder[5]){
            lettersInOrder[3]=display4[i];
        }
    }
    for(let i = 0; i<7; i++){
        if(display8[i]!==lettersInOrder[0] && display8[i]!==lettersInOrder[1] && display8[i]!==lettersInOrder[2] && display8[i]!==lettersInOrder[3] && display8[i]!==lettersInOrder[4] && display8[i]!==lettersInOrder[5]){
            lettersInOrder[6]=display8[i];
        }
    }
    lettersMapping.push(lettersInOrder);
});
let sum=0;
output.forEach((display, index) => {
    let decodedOutput = '';
    display.forEach(number =>{
        let letters = number.split('').sort().join('');
        const number2 = (lettersMapping[index][0]+lettersMapping[index][2]+lettersMapping[index][3]+lettersMapping[index][4]+lettersMapping[index][6]).split('').sort().join('');;
        const number3 = (lettersMapping[index][0]+lettersMapping[index][2]+lettersMapping[index][3]+lettersMapping[index][5]+lettersMapping[index][6]).split('').sort().join('');;
        const number5 = (lettersMapping[index][0]+lettersMapping[index][1]+lettersMapping[index][3]+lettersMapping[index][5]+lettersMapping[index][6]).split('').sort().join('');;
        const number6 = (lettersMapping[index][0]+lettersMapping[index][1]+lettersMapping[index][3]+lettersMapping[index][4]+lettersMapping[index][5]+lettersMapping[index][6]).split('').sort().join('');;
        const number9 = (lettersMapping[index][0]+lettersMapping[index][1]+lettersMapping[index][2]+lettersMapping[index][3]+lettersMapping[index][5]+lettersMapping[index][6]).split('').sort().join('');;
        const number0 = (lettersMapping[index][0]+lettersMapping[index][1]+lettersMapping[index][2]+lettersMapping[index][4]+lettersMapping[index][5]+lettersMapping[index][6]).split('').sort().join('');;

        if(letters.length === 2){
            decodedOutput += '1';
        }
        else if(letters.length === 4){
            decodedOutput += '4';
        }
        else if(letters.length === 3){
            decodedOutput += '7';
        }
        else if(letters.length === 7){
            decodedOutput += '8';
        }
        else if(letters === number2){
            decodedOutput += '2';
        }
        else if(letters === number3){
            decodedOutput += '3';
        }
        else if(letters === number6){
            decodedOutput += '6';
        }
        else if(letters === number5){
            decodedOutput += '5';
        }
        else if(letters === number9){
            decodedOutput += '9';
        }
        else if(letters === number0){
            decodedOutput += '0';
        }
    })
    sum+=Number(decodedOutput);
})
console.log(sum);