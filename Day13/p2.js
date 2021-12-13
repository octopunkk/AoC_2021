var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n');
let instructions = [];
let grid = [];

input.forEach(line => {
    line.replace('\r','');
    const matchesDigit = line.match(/(\d+),(\d+)/);
    const matchesInstruction = line.match(/(fold along) (\w)=(\d+)/);
    if(matchesDigit){
        grid.push([Number(matchesDigit[1]),Number(matchesDigit[2])])
    }
    else if(matchesInstruction){
        instructions.push([matchesInstruction[2],Number(matchesInstruction[3])])
    }
});

let xmax = 0;
let ymax = 0;
grid.forEach(point => {
    if(point[0]>xmax){
        xmax = point[0];
    } 
    if(point[1]>ymax){
        ymax = point[1];
    }
})

let display = grid => {
    let xm = 0;
    let ym = 0;
    grid.forEach(point => {
        if(point[0]>xm){
            xm = point[0];
        }
        if(point[1]>ym){
            ym = point[1];
        }
    })
    let newGrid = new Array(ym+1).fill(' ');
    for(let i=0; i<=ymax; i++){
        newGrid[i]= new Array(xm+1).fill(' ');
    }
    grid.forEach(point => {
        newGrid[point[1]][point[0]]='█'
    })
    gridStr = '';
    newGrid.forEach(line => {
        niceLine = line.join('')
        gridStr+=(niceLine+'\n');
    })
    console.log(gridStr);
}


let fold = (grid, instruction) => {    
    if(instruction[0]==='x'){
        let newGrid = [];
        grid.forEach(point => {
            if(point[0]<instruction[1]){
                let alreadyThere = false;
                newGrid.forEach(point2 => {
                    if(point2[0]===point[0] && point2[1]===point[1]){
                        alreadyThere = true;
                    }
                })
                if(!alreadyThere){
                    newGrid.push(point);
                }
            }
            else{
                let alreadyThere = false;
                newGrid.forEach(point2 => {
                    if(point2[0]===2*instruction[1]-point[0] && point2[1]===point[1]){
                        alreadyThere = true;
                    }
                })
                if(!alreadyThere){
                    newGrid.push([2*instruction[1]-point[0],point[1]])
                }
            }
            
        })
        xmax =0;
        ymax=0;
        newGrid.forEach(point => {
            if(point[0]>xmax){
                xmax = point[0];
            }
            if(point[1]>ymax){
                ymax = point[1];
            }
        })
        return newGrid;
    }
    if(instruction[0]==='y'){
        let newGrid = [];
        grid.forEach(point => {
            if(point[1]<instruction[1]){
                let alreadyThere = false;
                newGrid.forEach(point2 => {
                    if(point2[0]===point[0] && point2[1]===point[1]){
                        alreadyThere = true;
                    }
                })
                if(!alreadyThere){
                    newGrid.push(point);
                }
            }
            else{
                let alreadyThere = false;
                newGrid.forEach(point2 => {
                    if(point2[1]===2*instruction[1]-point[1] && point2[0]===point[0]){
                        alreadyThere = true;
                    }
                })
                if(!alreadyThere){
                    newGrid.push([point[0],2*instruction[1]-point[1]])
                }
            }
            
        })
        xmax =0;
        ymax=0;
        newGrid.forEach(point => {
            if(point[0]>xmax){
                xmax = point[0];
            }
            if(point[1]>ymax){
                ymax = point[1];
            }
        })
        return newGrid;
    }
}

instructions.forEach(instruction => {
    let newGrid = fold(grid, instruction);
    grid = newGrid.slice();
})

display(grid);