const gameContainer = document.querySelector('.game-container');
const playersInfo = document.querySelector('.players-info');
const restartButton = document.querySelector('.restart');

const X = 'O';
const Y = 'X';

let gameWon = false;

/**
 * Handle gameboard filed and game logic.
 */
const Gameboard = (() => {
    let field = new Array(9);
    /**
     * Create an empty game field or refresh the current one.
     * @return void
     */
    const createField = function () {
        field = new Array(9);
    };

    /**
     * 
     * @param {Number} x cell position on the field
     * @returns {String} mark of the cell
     */
    const getMark = function(x) {
        return field[x];
    };

    /**
     * 
     * @param {Number} x cell position on the field
     * @param {String} _mark mark to set
     */
    const setMark = function (x, mark) {
        field[x] = mark;
    };

    const win = function() {
        gameWon = true;
        DisplayController.win();
    }

    const tie = function() {
        if (field.includes(undefined)) return;
        gameWon = true;
        DisplayController.tie();
    }


    const isWin = function() {
        // check horizontals
        for (let i = 0; i <= 6; i+=3) {
            if (field[i] === field[i + 1] && field[i + 1] === field[i + 2] && (field[i] !== undefined)) {
                return win()
            }
        }
        // check vericals
        for (let i = 0; i <= 3; i++) {
            
            if (field[i] === field[i + 3] && field[i + 3] === field[i + 6] && (field[i] !== undefined)) {
                return win()
            }
        }

        // check diagonals
        if (field[0] === field[4] && field[4] === field[8] && field[0] !== undefined) {
            return win()
        }

        if (field[2] === field[4] && field[4] === field[6] && field[2] !== undefined) {
            return win()
        }

        tie()
    }

    return {
        createField,
        getMark,
        setMark,
        isWin,
        tie,
        win
    };
})();


/**
 * Handle the visual part of the game. Connects HTML and JS in some way.
 */
const DisplayController = (() => {

    /**
     * Create cells in Game Container and apply id to them.
     */
    const createBoard = function() {
        if (gameContainer.hasChildNodes()) return console.log('Game Container has been created already.');
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.id = i;
            cell.addEventListener('click', onCellClick);
            gameContainer.appendChild(cell);
        }
    }

    const win = function() {
        playersInfo.innerText = TurnsController.getCurrentPlayer() === TurnsController.getFirstPlayer() ? 'First player\'s won!' : 'Second player\'s won!'
    }

    const tie = function() {
        playersInfo.innerText = 'Tie!'
    }

    /**
     * 
     * @param {Number} cellId id of the cell
     * @param {String} mark player mark to set
     */
    const setCell = function(cellId, mark) {
        const cell = document.getElementById(cellId);
        if (cell.classList.contains(X) || cell.classList.contains(Y)) return;
        
        Gameboard.setMark(cellId, mark)
        cell.classList.add(mark);
    }

    return {createBoard, setCell, win, tie};
})();


/**
 * Control the game sequence and players' turns.
 */
const TurnsController = (() => {
    let firstPlayer;
    let secondPlayer;
    let currentPlayer;

    const updateTurnInfo = function() {
        if (gameWon) return;
        playersInfo.innerText = 'It\'s ' + currentPlayer.getMark() + ' turn!';
    }

    const getCurrentPlayer = function() {
        return currentPlayer;
    }

    const getFirstPlayer = function() {
        return firstPlayer;
    }

    const getSecondPlayer = function() {
        return secondPlayer;
    }

    const startGame = function(player1, player2) {
        firstPlayer = player1;
        secondPlayer = player2;
        
        currentPlayer = firstPlayer;

        updateTurnInfo();
    };

    const nextTurn = function() {
        currentPlayer === firstPlayer ?  currentPlayer = secondPlayer : currentPlayer = firstPlayer;
        updateTurnInfo();
    }

    const checkForWin = function() {
        Gameboard.isWin();
    }

    return {startGame, getCurrentPlayer, nextTurn, checkForWin, getFirstPlayer, getSecondPlayer}
})();


const Player = (mark) => {
    const getMark = () => mark;

    return {getMark}
};


function onCellClick(e) {
    if (gameWon === true) return;
    DisplayController.setCell(e.target.id, TurnsController.getCurrentPlayer().getMark());
    TurnsController.checkForWin();
    TurnsController.nextTurn();
}


function restart(e) {
    location.reload();
}

Gameboard.createField();
DisplayController.createBoard();

TurnsController.startGame(Player(X), Player(Y));

restartButton.addEventListener('click', restart)