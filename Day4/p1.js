var fs = require('fs');
var text = fs.readFileSync("./input.txt", 'utf-8').replace(/\r/g, '');
var input = text.split('\n');
var numbers = input[0].split(',');
var boards = input.slice(1);

const BOARD_SIZE = 5;

let boardsArray = [];
// [ [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]] ]
for(let i = 1; i < boards.length; i+=6) {
    const boardLines = boards.slice(i, BOARD_SIZE + i); // ["1 2 3 4 5", "1 2 3 4 5", "1 2 3 4 5", "1 2 3 4 5", "1 2 3 4 5"]
    const board = boardLines.map((line) => { // line = "1 2 3 4 5"
        // "1 2 3 4 5" => [1, 2, 3, 4, 5]
        return line.replace(/^ /, '').replace(/  /g, ' ').split(' ');
    });
    boardsArray.push(board);
    // [['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5']]
}

let markBoard = (winNumber, board) => {
    // winNumber => '2'
    // board => [['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5']]
    // result => [['1', '#', '3', '4', '5'], ['1', '#', '3', '4', '5'], ['1', '#', '3', '4', '5'], ['1', '#', '3', '4', '5'], ['1', '#', '3', '4', '5']]
    return board.map(row => {
        return row.map((element, i) => {
            if(element == winNumber){
                return '#'
            }
            else {
                return element;
            }
        });
    });
}


let getWinner = board => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        // pour chaque ligne
        let allMarked = true;
        for (let j = 0; j < BOARD_SIZE; j++) {
            // pour chaque colonne dans chaque ligne
            if(board[i][j]!=='#'){
                allMarked = false;
            }
        }
        if(allMarked){
            return true
        }
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
        // pour chaque colonne
        let allMarked = true;
        for (let j = 0; j < BOARD_SIZE; j++) {
            // pour chaque ligne dans chaque colonne
            if(board[j][i]!=='#'){
                allMarked = false;
            }
        }
        if(allMarked){
            return true
        }
    }

    return false;
}


numbers.forEach(number => {
    const remainingBoards = boardsArray.slice();

    boardsArray = boardsArray.map(board => {
        return markBoard(number, board);
    }).filter(board => !getWinner(board))

    // boardsArray => toute les boards qui ne gagnent pas
    if(boardsArray.length == 0){
        // elles ont toutes gagné
        console.log(remainingBoards)
        console.log(number)
        let sum = 0;
        for (let i = 0; i < BOARD_SIZE; i++) {
            // pour chaque ligne
            for (let j = 0; j < BOARD_SIZE; j++) {
                // pour chaque colonne dans chaque ligne
                if(remainingBoards[0][i][j]!=='#'){
                    sum+=parseInt(remainingBoards[0][i][j]);

                }
            }
        }
        console.log((sum-number)*number);
        process.exit(0)
    }
    // boardsArray = boardsArray.map(board => {
    //     const markedBoard = markBoard(number, board);
    //     if(getWinner(markedBoard)){
            
    //         console.log(markedBoard);
    //         let sum = 0;
    //         for (let i = 0; i < BOARD_SIZE; i++) {
    //             // pour chaque ligne
    //             for (let j = 0; j < BOARD_SIZE; j++) {
    //                 // pour chaque colonne dans chaque ligne
    //                 if(markedBoard[i][j]!=='#'){
    //                     sum+=parseInt(markedBoard[i][j]);

    //                 }
    //             }
    //         }
    //         console.log(sum*number);
    //         process.exit(0);
    //     }
    //     return markedBoard;
    // });
});
    
