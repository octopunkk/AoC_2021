var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8').replace(/\r/g, '');
var input = text.split('\n');

/*-------------------------------------------------------------------
                    Plan d'attaque 
    1) Créer un array pour avoir accès facilement aux valeurs
        == Array vents
   
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
// const lineVents = vents.map(line => {
//     // console.log(line);
//     //line = [0, 1, 0, 3];
//     if (line[0] == line[2]){
//         if(line[1] > line[3]){
//             return [line[0], line[3], line[2], line[1]];
//         } else {
//             return line;
//         }
//     }
//     else if (line[1] == line[3]){
//         if(line[0] > line[2]){
//             return [line[2], line[1], line[0], line[3]];
//         } else {
//             return line;
//         }
//     }
// });

//Etape 2
let allPoints = [];
let counter = 0;
vents.forEach(line => {
    console.log(`Line: ${line[0]}-${line[1]} => ${line[2]} - ${line[3]}`);
    // Math.sign(0) === 0
    // Math.sign(-42) === -1
    // Math.sign(42) === 1


    const stepX = Math.sign(line[2]-line[0]); // -1 or 0 or 1
    const stepY = Math.sign(line[3]-line[1]); // -1 or 0 or 1
    let currentPoint = [line[0], line[1]];

    while (currentPoint[0] !== line[2] || currentPoint[1] !== line[3]) {
      allPoints.push(currentPoint);
      console.log(`Adding point: ${currentPoint[0]}-${currentPoint[1]}`);

      const matchingPointsInAllPoints = allPoints.filter((p) => {
          return p[0] === currentPoint[0] && p[1] === currentPoint[1];
      }).length;
      if(matchingPointsInAllPoints == 2){
          console.log(`Found 2 matching points`);
          counter+=1;
      }
      currentPoint = [currentPoint[0]+stepX , currentPoint[1]+stepY];
      // currentPoint[0]+=stepX;
      // currentPoint[1]+=stepY;

      // Advance currentPoint
    }
    allPoints.push(currentPoint);
    const matchingPointsInAllPoints = allPoints.filter((p) => {
        return p[0] === currentPoint[0] && p[1] === currentPoint[1];
    }).length;
    if(matchingPointsInAllPoints == 2){
        console.log(`Found 2 matching points`);
        counter+=1;
    }
    
    
});

console.log(counter)
