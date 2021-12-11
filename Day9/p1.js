var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
let grid = [];
input.forEach(line => grid.push(line.replace('\r', '').split('').map(value => Number(value))));
console.log(grid);
let lowPoints = [];
const GRID_W = grid[0].length;
const GRID_H = grid.length;
console.log(GRID_H, GRID_W);

for (let i = 0; i<GRID_H; i++){
    for (let j = 0; j<GRID_W; j++){
        if((i===0 || grid[i][j]<grid[i-1][j]) && ( i===GRID_H-1 || grid[i][j]<grid[i+1][j]) && (j===0  || grid[i][j]<grid[i][j-1]) && (j===GRID_W-1 || grid[i][j]<grid[i][j+1] )){
            lowPoints.push(grid[i][j]);
        }
    }
}

let riskLevels  = lowPoints.map(lowPoint => lowPoint+1);
let sum = riskLevels.reduce((prev, curr) => prev+curr);
console.log(sum);