// create a gameboard object
// create a player object
// create a displayController to populate stuff on DOM
// make players populate stuff on DOM
// build win/lose and turns logic

const X = 'x';
const Y = 'y'

const Gameboard = (() => {
    const field = Array.from(Array(3), () => new Array(3));


    const getMark = function (x, y) {
        return this.field[x][y];
    };


    const setMark = function (x, y, mark) {
        this.field[x][y] = mark;
    };

    return {
        field,
        getMark,
        setMark
    };
})();



Gameboard.setMark(1, 2, 'x')

console.log(Gameboard.getMark(1, 2));