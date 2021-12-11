var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
let grid = [];
text.split('\n').forEach(line => grid.push(line.replace('\r', '').split('').map(value => Number(value))));
let lowPoints = [];
const GRID_W = grid[0].length;
const GRID_H = grid.length;
let allBasin = [];

for (let i = 0; i<GRID_H; i++){
    for (let j = 0; j<GRID_W; j++){
        if((i===0 || grid[i][j]<grid[i-1][j]) && ( i===GRID_H-1 || grid[i][j]<grid[i+1][j]) && (j===0  || grid[i][j]<grid[i][j-1]) && (j===GRID_W-1 || grid[i][j]<grid[i][j+1] )){
            lowPoints.push([i,j]);
        }
    }
}
let duplicateCheck = (i,j,thisBasin) => {
    return thisBasin.some(point => point[0]===i && point[1]===j)
}
let findBasin = (i,j,basin) => {
    console.log(basin);
    if(i!==0 && grid[i-1][j] !== 9 && !duplicateCheck(i-1, j, basin)){
        basin.push([i-1, j]);
        findBasin(i-1, j,basin);
    }
    if( i!==GRID_H-1  && grid[i+1][j] !== 9 && !duplicateCheck(i+1, j, basin)){
        basin.push([i+1, j]);
        findBasin(i+1, j,basin);
    }
    if(j!==0 && grid[i][j-1] !== 9 && !duplicateCheck(i, j-1, basin)){
        basin.push([i, j-1]);
        findBasin(i, j-1,basin);
    }
    if(j!==GRID_W-1 && grid[i][j+1] !== 9 && !duplicateCheck(i, j+1, basin)){
        basin.push([i, j+1]);
        findBasin(i, j+1,basin);
    }
}


lowPoints.forEach(point => {
    let i = point[0];
    let j = point[1];
    let basin = [[i,j]];
    findBasin(i,j,basin);
    console.log(basin.length);
    allBasin.push(basin)

});

// let top3 = new Array(3).fill(0);
// allBasin.forEach(basin => {
//     if(basin.length > Math.max(...top3)){
//         top3[top3.find(n => n===Math.max(top3))]=basin.length;
//     }
// });

let lengths = allBasin.map(basin => basin.length).sort((a,b) => b-a);
console.log(lengths)
console.log(lengths[0]*lengths[1]*lengths[2])
