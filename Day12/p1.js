var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n').map(line => {
    line.replace('\r','');
    const matches = line.match(/(\w+)[-](\w+)/);
    return [matches[1],matches[2]]});

let cave = 'start';
let currentPath = [];
let allPath = [];
let visited = [];

let findPath = (cave, currentPath, visited) => {
    let newVisited = visited.slice();
    if(cave===cave.toLowerCase()){
        newVisited.push(cave);
    }
    console.log(`current path : ${currentPath}`)
    console.log(`visited : ${visited}`)
    input.forEach(line => {
        if(line[0]===cave){
            if(line[1] === 'end'){
                currentPath.push('end');
                allPath.push(currentPath);
                console.log(`path done ! : ${currentPath}`);
            }
            else if (!newVisited.includes(line[1])){
                let newPath = currentPath.slice();
                newPath.push(cave)
                findPath(line[1],newPath,newVisited);
            }
            
        }
        else if(line[1]===cave){
            if(line[0] === 'end'){
                currentPath.push('end');
                allPath.push(currentPath);
                console.log(`path done ! : ${currentPath}`);
            }
            else if (!newVisited.includes(line[0])){
                let newPath = currentPath.slice();
                newPath.push(cave)
                findPath(line[0],newPath,newVisited);
            }
            
        }
    })
}


findPath(cave,currentPath,visited);
console.log(allPath.length)
