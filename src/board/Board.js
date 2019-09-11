import React, { useState } from 'react';

const Board = () => {
    const [board, setBoard] = useState([
        ['RS', 'RS', 'RM', 'RS', 'RS'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['BS', 'BS', 'BM', 'BS', 'BS']
    ]);
    console.log(board);
    const testOneMove = (fromA, fromB, toA, toB) => {
        let hold = [...board];
        console.log('hold: ' + hold);
        let extractedPiece = hold[fromA].splice(fromB, 1, "empty");
        console.log(extractedPiece)
        let placePiece = hold[toA].splice(toB, 1, extractedPiece);
        console.log(placePiece)
        setBoard(hold);
        console.log("hold done: " + hold)
    }

    // PROBLEM LEFT OFF HERE
    // its splcing good just places ["RS"] inside so double array
    // I just want it to put "RS" not ["RS"]
    // my guess is something like indexOF valueOf

    const buttonTest = () => {
        console.log('click');
        // get fromA fromB by clicking on piece
        // highlight possible moves
        //get toA toB by clicking on place

        // pass the fromA fromB toA toB values here and do move
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