var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
let grid = [];
input.forEach(line => grid.push(line.replace('\r', '').split('').map(value => Number(value))));
let GRID_SIZE = 10;
let flashedAlready = [];
let flashCount = 0;

let flash = (i,j) => {
    if(!flashedAlready.some(octopus => octopus[0]===i && octopus[1]===j)){
        // console.log(`currently flashing ${i},${j}`)
        flashedAlready.push([i,j]);
        for(let a=i-1; a<=i+1;a++){
            for(let b=j-1; b<=j+1;b++){
                if(a>=0 && a<GRID_SIZE && b>=0 && b<GRID_SIZE ){
                    grid[a][b]+=1;
                    if(grid[a][b]>9){
                        flash(a,b);
                    }
                }
            }
        }
    }
}
let bigFlash = false;
let steps = 0;
while(!bigFlash){
    steps+=1;
    flashedAlready = [];
    //first, the energy level of each octopus increases by 1
    for(let i =0; i<GRID_SIZE; i++){
        for(let j = 0; j<GRID_SIZE; j++){
            grid[i][j]+=1;
        }
    }
    //then the flashes
    for(let i =0; i<GRID_SIZE; i++){
        for(let j = 0; j<GRID_SIZE; j++){
            if(grid[i][j] > 9){
                flash(i,j);
            }
        }
    }
    //then sets to 0 every octopus that flashed
    flashedAlready.forEach(octopus => {
        flashCount+=1;
        grid[octopus[0]][octopus[1]]=0;
    });
    let ref = grid[0][0];
    bigFlash= true;
    for(let i =0; i<GRID_SIZE; i++){
        for(let j = 0; j<GRID_SIZE; j++){
            if(grid[i][j] != ref){
                bigFlash=false;
            }
        }
    }
}
console.log(grid);
console.log(steps);