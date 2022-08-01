// create a gameboard object
// create a player object
// create a displayController to populate stuff on DOM
// make players populate stuff on DOM
// build win/lose and turns logic

const gameContainer = document.querySelector('.game-container')

const X = 'x';
const Y = 'y';

const Gameboard = (() => {
    let field;

    const createField = function () {
        field = new Array(9);
    }

    const getMark = function (x, y) {
        return this.field[x][y];
    };


    const setMark = function (x, y, mark) {
        this.field[x][y] = mark;
    };

    return {
        createField,
        getMark,
        setMark
    };
})();

const DisplayController = (() => {

    const createBoard = function() {
        if (gameContainer.hasChildNodes()) return console.log('Game Container has been created already.');
        for (let i = 0; i < 10; i++) {
            const cell = document.createElement('div');
            cell.id = i;
            gameContainer.appendChild(cell);
        }
    }

    const updateBoard = function (gameboard) {}

    return {createBoard, updateBoard};
})();

const Player = (mark) => {
    const getMark = () => mark;

    return {getMark}
};

Gameboard.createField();
DisplayController.createBoard();