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
        console.log('Field has been created.');
    }

    const getMark = function (x) {
        return this.field[x][y];
    };


    const setMark = function (x, mark) {
        this.field[x] = mark;
    };

    return {
        createField,
        getMark,
        setMark
    };
})();


const Player = (mark) => {
    const getMark = () => mark;

    return {getMark}
};

Gameboard.createField();
DisplayController.createBoard();