/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

const startGame = () => {
    let board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };

// TODO: update the game board with the user input
    function markBoard(position, mark) {
        board[position] = mark
    }

// TODO: print the game board as described at the top of this code skeleton
    function printBoard() {
        console.log(
            `${board[1]} | ${board[2]} | ${board[3]}\n` +
            `---------\n` +
            `${board[4]} | ${board[5]} | ${board[6]}\n` +
            `---------\n` +
            `${board[7]} | ${board[8]} | ${board[9]}`
        )
    }


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
    function validateMove(position) {
        if (isNaN(position) || position < 1 || position > 9) {
            return false;
        }
        return board[position] === ' ';
    }

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
    let winCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
    function checkWin(player) {
        return winCombinations.some(combination =>
            combination.every(position => board[position] === player)
        )
    }

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie basically means the whole board is already occupied
// This function should return with boolean
    function checkFull() {
        return Object.values(board).every(cell => cell !== ' ');

    }

// *****************************************************
// Copy all your code/functions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
    function playTurn(player) {
        let position;
        do {
            position = prompt(`Player ${player}, enter your move (1-9): `);
        } while (!validateMove(position));

        markBoard(position, player);
        printBoard();

        if (checkWin(player)) {
            console.log(`Player ${player} wins!`);
            return true;
        } else if (checkFull()) {
            console.log("It's a tie!");
            return true;
        }
        return false;
    }

// entry point of the whole program
    console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');

    let winnerIdentified = false
    let currentTurnPlayer = 'X'

    while (!winnerIdentified) {
        winnerIdentified = playTurn(currentTurnPlayer);
        if (!winnerIdentified) {
            currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
        }
        // feel free to add logic here if needed, e.g. announcing winner or tie
    }
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
    const playGame = () => {
        let playAgain = true

        while (playAgain) {
            startGame()

            const userWant = prompt("Do you want to play again? (y/n)").toUpperCase()
            if (userWant !== "Y") {
                playAgain = false
                console.log("Goodbye!")
            }
        }
    }
playGame()
