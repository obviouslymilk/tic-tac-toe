// create a gameboard object
// create a player object
// create a displayController to populate stuff on DOM
// make players populate stuff on DOM
// build win/lose and turns logic
//! add field clearing
//! add field creating functions

const X = 'x';
const Y = 'y';

const Gameboard = (() => {
    const field = Array.from(Array(3), () => new Array(3));

    const getMark = function (x, y) {
        return this.field[x][y];
    };


    const setMark = function (x, y, mark) {
        this.field[x][y] = mark;
    };

    return {
        getMark,
        setMark
    };
})();


const Player = (mark) => {
    const getMark = () => mark;

    return {getMark}
};