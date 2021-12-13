var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8');
var input = text.split('\n').map(line => {
    line.replace('\r','');
    const matches = line.match(/(\w+)[-](\w+)/);
    return [matches[1],matches[2]]
});

const allPath = [];

let findPath = (currentPath) => {
    const cave = currentPath[currentPath.length - 1];
    // if(cave === cave.toLowerCase()){
    //     // if current cave is small
    //     if(!newVisited.includes(cave)){
    //         newVisited.push(cave);
    //     }
    //     else {
    //         newVisitedTwice.push(cave);
    //     }
    // }
    const allPossibleNextCaves = []; // toutes les caves qui sont connectées à la cave actuelle
    input.forEach(line => {
        if(line[0]===cave){
            allPossibleNextCaves.push(line[1])
        }
        if(line[1]===cave){
            allPossibleNextCaves.push(line[0])
        }
    });

    let alreadyVisitedSmallCaveTwice = false;
    let smallCaves =[];

    //...
    currentPath.forEach(cave => {
        if(cave === cave.toLowerCase()){
            if(!smallCaves.includes(cave)){
                smallCaves.push(cave)
            }
            else if(smallCaves.includes(cave)){
                alreadyVisitedSmallCaveTwice = true;
            }
        }
    })
    const cavesWeShouldVisit = allPossibleNextCaves.filter((nextCave) => {
        if(nextCave === nextCave.toUpperCase()){
            return true;
        }
        if(!currentPath.includes(nextCave)){
            return true;
        }
        if(nextCave === 'start'){
            return false;
        }
        return !alreadyVisitedSmallCaveTwice;
    }); // toutes les caves dans lesquelles on devrait aller

    cavesWeShouldVisit.forEach((nextCave) => {
        const newPath = [...currentPath, nextCave];
        if(nextCave === 'end'){
            allPath.push(newPath);
        }
        else{
            findPath(newPath);
        }
    });

    // input.forEach(line => {
    //     if(line[0]===cave){
    //         if(line[1] === 'end'){
    //             console.log(`line : ${line}`)
    //             currentPath.push('end');
    //             console.log(`path added : ${currentPath}`)
    //             allPath.push(currentPath);
    //         }
    //         else if (!newVisitedTwice.includes(line[1])){
    //             // let newPath = currentPath.slice();
    //             // newPath.push(cave)
    //             const newPath = [...currentPath, cave];
    //             findPath(line[1],newPath,newVisited,newVisitedTwice);
    //         }
            
    //     }
    //     else if(line[1]===cave){
    //         if(line[0] === 'end'){
    //             currentPath.push('end');
    //             allPath.push(currentPath);
    //         }
    //         else if (!newVisitedTwice.includes(line[0])){
    //             // let newPath = currentPath.slice();
    //             // newPath.push(cave);
    //             const newPath = [...currentPath, cave];
    //             findPath(line[0],newPath,newVisited,newVisitedTwice);
    //         }
            
    //     }
    // })
}


findPath(['start']);
console.log(allPath)

console.log(allPath.length)
