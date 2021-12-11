var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
var gamma = '';
var epsilon = '';

for(let i = 0; i < (input[0]).length-1; i++){
    let ones = 0;
    let zeroes = 0;
    input.forEach(element => {
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
Dgamma = parseInt(gamma, 2);
Depsilon = parseInt(epsilon, 2);
console.log(Dgamma*Depsilon);