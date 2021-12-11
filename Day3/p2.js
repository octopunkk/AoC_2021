var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');

var oxygen = input.slice();
var co2 = input.slice();

let getData = (inputArray) => {
    var gamma = '';
    var epsilon = '';

    for(let i = 0; i < (inputArray[0]).length; i++){
        let ones = 0;
        let zeroes = 0;
        inputArray.forEach(element => {
            const num = element.split('');
            if (num[i] == 1){
                ones+=1;
            }
            else {
                zeroes+=1;
            }
        });
        
        if(ones>=zeroes){
            gamma+='1';
            epsilon+='0';
        }
        else{
            gamma+='0';
            epsilon+='1';
        }
    }
    return [gamma, epsilon];
}


let getOxygen = () => {
    let newOxygen = oxygen.slice();
    for(let i = 0; i < (input[0]).length; i++){
        oxygen = newOxygen.slice();
        newOxygen = [];
        gamma = getData(oxygen)[0];
        oxygen.forEach(element => {
            const num = element.split('');
            if (num[i] == gamma[i]){
                newOxygen.push(element);
            };
        });
        if (newOxygen.length == 0){
            return oxygen;
        }
    };
}

let getCo2 = () => {
    let newCo2 = co2.slice();
    for(let i = 0; i < (input[0]).length; i++){
        co2 = newCo2.slice();
        newCo2 = [];
        let epsilon = getData(co2)[1];
        co2.forEach(element => {
            const num = element.split('');
            if (num[i] == epsilon[i]){
                newCo2.push(element);
            };
        });
        if (newCo2.length == 0){
            return co2;
        }
    };
}

let oxygenRating = getOxygen()
let co2Rating = getCo2();
Doxygen = parseInt(oxygenRating, 2);
Dco2 = parseInt(co2Rating, 2);
console.log(Doxygen);
console.log(Dco2);
console.log(Doxygen*Dco2);

