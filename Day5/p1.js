var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8').replace(/\r/g, '');
var input = text.split('\n');

/*-------------------------------------------------------------------
                    Plan d'attaque 
    1) Créer un array pour avoir accès facilement aux valeurs
        == Array vents
    2) Comparer les x1 avec les x2 et les y1 avec les y2
        => retirer toutes les lignes ou on a pas 
           x1 = x2 ou y1 = y2
        == Array lineVents
    3) Pour chaque ligne de lineVents, "tracer" les lignes
        => créer chaque point avec une boucle : un point = [x,y]
        => mettre chaque point dans un Array : Array = [[x,y],[x,y]]
        => compter le nombre d'occurences de chaque point ??
           
    

-------------------------------------------------------------------*/

//Etape 1
const vents = input.map((line) => {
    const regex = /\d+/g;
    const match = line.match(regex);
    return [
        parseInt(match[0]),
        parseInt(match[1]),
        parseInt(match[2]),
        parseInt(match[3]),
    ]
});

//Etape 2
const lineVents = [];
vents.forEach(line => {
    // console.log(line);
    //line = [0, 1, 0, 3];
    if (line[0] == line[2]){
        if(line[1] > line[3]){
            lineVents.push([line[0], line[3], line[2], line[1]])
        } else {
            lineVents.push(line);
        }
    }
    else if (line[1] == line[3]){
        if(line[0] > line[2]){
            lineVents.push([line[2], line[1], line[0], line[3]])
        } else {
            lineVents.push(line);
        }
    }
});

//Etape 3
let allPoints = [];
let counter = 0;
lineVents.forEach(line => {
    console.log(`Line: ${line[0]}-${line[1]} => ${line[2]} - ${line[3]}`);
    for (let i = line[0] ; i <= line[2] ; i++){
        for(let j = line[1]; j <= line[3]; j++){
            let point = [i,j];
            allPoints.push(point);
            // console.log(`Adding point: ${i}-${j}`);

            const matchingPointsInAllPoints = allPoints.filter((p) => {
                return p[0] === point[0] && p[1] === point[1];
            }).length;
            if(matchingPointsInAllPoints == 2){
                // console.log(`Found 2 matching points`);
                counter+=1;
            }
            // increase counter when we detect a duplicate

            // [0,0] => matchingPointsInAllPoints === 1
            // ...
            // [0,0] => matchingPointsInAllPoints === 2 ==> DETECTED
            // ...
            // [0,0] => matchingPointsInAllPoints === 3
        };
    };
});

console.log(counter)
