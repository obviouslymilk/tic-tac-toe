

const gameContainer = document.querySelector('.game-container');
const playersInfo = document.querySelector('.players-info');

const X = 'x';
const Y = 'y';

let gameWon = false;

/**
 * Handle gameboard filed and game logic.
 */
const Gameboard = (() => {

    /**
     * Create an empty game field or refresh the current one.
     * @return void
     */
    const createField = function () {
        this.field = new Array(9);
    };

    /**
     * 
     * @param {Number} x cell position on the field
     * @returns {String} mark of the cell
     */
    const getMark = function(x) {
        return this.field[x];
    };

    /**
     * 
     * @param {Number} x cell position on the field
     * @param {String} _mark mark to set
     */
    const setMark = function (x, mark) {
        this.field[x] = mark;
    };

    const Win = function() {
        gameWon = true;
    }


    const isWin = function() {
        // check horizontals
        for (let i = 0; i <= 6; i+=3) {
            
            if (this.field[i] === this.field[i + 1] && this.field[i + 1] === this.field[i + 2] && (this.field[i] !== undefined)) {
                Win()
            }
        }
        // check vericals
        for (let i = 0; i <= 3; i++) {
            
            if (this.field[i] === this.field[i + 3] && this.field[i + 3] === this.field[i + 6] && (this.field[i] !== undefined)) {
                Win()
            }
        }

        // check diagonals
        if (this.field[0] === this.field[4] && this.field[4] === this.field[8] && this.field[0] !== undefined) {
            Win()
        }

        if (this.field[2] === this.field[4] && this.field[4] === this.field[6] && this.field[2] !== undefined) {
            Win()
        }
    }

    return {
        createField,
        getMark,
        setMark,
        isWin
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
        TurnsController.nextTurn();
    }

    return {createBoard, setCell};
})();


/**
 * Control the game sequence and players' turns.
 */
const TurnsController = (() => {
    let firstPlayer;
    let secondPlayer;
    let currentPlayer;

    const updateTurnInfo = function() {
        playersInfo.innerText = currentPlayer.getMark();
    }

    const getCurrentPlayer = function() {
        return currentPlayer;
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

    return {startGame, getCurrentPlayer, nextTurn, checkForWin}
})();


const Player = (mark) => {
    const getMark = () => mark;

    return {getMark}
};


function onCellClick(e) {
    if (gameWon === true) return;
    DisplayController.setCell(e.target.id, TurnsController.getCurrentPlayer().getMark());
    TurnsController.checkForWin();
}

Gameboard.createField();
DisplayController.createBoard();

TurnsController.startGame(Player(X), Player(Y));