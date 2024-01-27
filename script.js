const squaresDivList = document.querySelectorAll('.board-square');
const button = document.querySelector('.btn');
const squaresRow1 = document.querySelectorAll('.r1');
const squaresRow2 = document.querySelectorAll('.r2');
const squaresRow3 = document.querySelectorAll('.r3');
let squareDivList = [Array.from(squaresRow1), Array.from(squaresRow2), Array.from(squaresRow3)];
let currentSymbol = 'X';

playerX = makePlayer ('X');
playerO = makePlayer ('O');
let playerTurnsStorage = [];

button.addEventListener ('click', () => {
    playerTurnsStorage = [];
    playerX.playerChosenSquares = [['', '', ''], ['', '', ''], ['', '', '']];
    playerO.playerChosenSquares = [['', '', ''], ['', '', ''], ['', '', '']];
    let currentSymbol = 'X';
    for (let i = 0; i < squareDivList.length; i++) {
        for (let j = 0; j < squareDivList[i].length; j++) {
            squareDivList[i][j].textContent = '';
        }
    }
});

function makePlayer (symbol) {
    const playerName = 'player' + symbol;
    const playerSymbol = symbol;
    const playerChosenSquares = [['', '', ''], ['', '', ''], ['', '', '']];
    const playerWins = 0;

    return { playerName, playerSymbol, playerChosenSquares, playerWins};
}

function setSquares(col, row) {

    if (playerX.playerChosenSquares[+row -1][+col - 1] == '') {
        if (playerTurnsStorage == '') {
            playerX.playerChosenSquares[+row -1][+col - 1] = 'O';
            playerO.playerChosenSquares[+row -1][+col - 1] = 'O';
            playerTurnsStorage.push('O');
            currentSymbol = 'O';
        } else if (playerTurnsStorage[playerTurnsStorage.length - 1] == 'X') {
            playerX.playerChosenSquares[+row -1][+col - 1] = 'O';
            playerO.playerChosenSquares[+row -1][+col - 1] = 'O';
            playerTurnsStorage.push('O');
            currentSymbol = 'O';
        } else if (playerTurnsStorage[playerTurnsStorage.length - 1] == 'O') {
            playerX.playerChosenSquares[+row -1][+col - 1] = 'X';
            playerO.playerChosenSquares[+row -1][+col - 1] = 'X';
            playerTurnsStorage.push('X');
            currentSymbol = 'X';
        } else {
            console.log('Error');
        }
    } else {
        console.log('Already chosen');
    }
    console.log(playerX.playerChosenSquares);
    if (checkWin (playerX.playerChosenSquares) == 'X') {
        playerO.playerWins++;
        console.log('O wins');
        console.log(playerO.playerWins + " " + playerX.playerWins);
    } else if (checkWin (playerX.playerChosenSquares) == 'O') {
        playerX.playerWins++;
        console.log('X wins');
        console.log(playerO.playerWins + " " + playerX.playerWins);
    } else if (checkWin (playerX.playerChosenSquares) == 'Tie') {
        console.log('Tie');
        console.log(playerO.playerWins + " " + playerX.playerWins);
    }
}

function checkWin (board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '') {
            return (board[i][0]);
        } else if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '') {
            return (board[0][i]);
        }
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '' && board[1][1] != '' && board[2][2] != '') {
        return (board[0][0]);
    } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '' && board[1][1] != '' && board[2][0] != '') {
        return (board[0][2]);
    }

    if (playerTurnsStorage.length == 9) {
        return 'Tie';
    }
}

for (let i = 0; i < squaresDivList.length; i++) {
    for (let j = 0; j < squareDivList[i].length; j++) {
        squareDivList[i][j].addEventListener ('click', () => {
            console.log(squareDivList[i][j].classList[2], squareDivList[i][j].classList[3]);
            squareDivList[i][j].textContent = currentSymbol;
            setSquares(squareDivList[i][j].classList[2], squareDivList[i][j].classList[3] - 3);
        })
    }
}