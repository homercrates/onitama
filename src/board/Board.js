import React, { useState } from 'react';

const Board = () => {
    const [board, setBoard] = useState([
        [['RS'], ['RS'], ['RM', "R throne"], ['RS'], ['RS']],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [['BS'], ['BS'], ['BM', "B throne"], ['BS'], ['BS']]
    ]);

    const testOneMove = (fromA, fromB, toA, toB) => {
        let hold = [...board];
        console.log(hold);
        let extractedPiece = hold[fromA].splice(fromB, 1, "empty");
        let placePiece = hold[toA].splice(toB, 0, extractedPiece);
        setBoard(hold);
    }

    const buttonTest = () => {
        console.log('click');
        testOneMove(0, 0, 1, 0);
    }

    return (
        <div>
            {board}
            <button onClick={buttonTest} >testMove</button>
            {board}
        </div>
    )
}

export default Board;

/*
[
    [['RS'],['RS'],['RM',"throne"],['RS'],['RS']],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [['BS'],['BS'],['BM',"throne"],['BS'],['BS']]
]
*/
// board[0][0]  has 'RS'
// board[1][0] is one sqaure up