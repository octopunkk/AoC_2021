var fs = require('fs');
var text = fs.readFileSync("./inputTest.txt", 'utf-8');
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
                    if(point2[0]===xmax-point[0] && point2[1]===point[1]){
                        alreadyThere = true;
                    }
                })
                if(!alreadyThere){
                    newGrid.push([xmax-point[0],point[1]])
                }
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
                    if(point2[1]===ymax-point[1] && point2[0]===point[0]){
                        alreadyThere = true;
                    }
                })
                if(!alreadyThere){
                    newGrid.push([point[0],ymax-point[1]])
                }
            }
            
        })
        return newGrid;
    }
}

let finalGrid = fold(grid, instructions[1]);
console.log(grid);
console.log(finalGrid)
console.log(finalGrid.length)
