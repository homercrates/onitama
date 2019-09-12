import React, { useState, useEffect } from 'react';

import RenderMap from './RenderMap';

const Board = () => {
    // board state
    const [board, setBoard] = useState([
        ['RS', 'RS', 'RM', 'RS', 'RS'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['BS', 'BS', 'BM', 'BS', 'BS']
    ]);

    // hand state
    const [blueHand, setBlueHand] = useState([['hand one'], ['hand two']])

    useEffect(() => {
        console.log(board);
    }, [board])

    const testOneMove = (fromA, fromB, toA, toB) => {
        let hold = [...board];
        let extractedPiece = hold[fromA][fromB]
        let placePiece = hold[toA][toB]

        if (extractedPiece === 'empty') throw new Error('no piece to move')

        hold[fromA][fromB] = "empty"
        hold[toA][toB] = extractedPiece

        if (placePiece !== 'empty') console.log(`${extractedPiece} killed ${placePiece}`)
        console.log(`${extractedPiece} moves from [${fromA}][${fromB}] to [${toA}][${toB}]`)

        setBoard(hold);
    }
    // exported MoveHandler();
    // PROBLEM LEFT OFF HERE
    // its splcing good just places ["RS"] inside so double array
    // I just want it to put "RS" not ["RS"]
    // my guess is something like indexOF valueOf

    // use this but change the name later
    // const buttonTest = () => MoveHandler(testOneMove);
    const buttonTest = () => {
        console.log('click')
        testOneMove(0, 0, 1, 0)
    }

    const spillMap = RenderMap(board)

    // render the board indiv <div>s  can control style here

    return (
        <div>
            {board}
            <button style={{ backgroundColor: 'lightgrey' }} onClick={buttonTest} >testMove</button>
            <div>
                <p>render board</p>
                <div>
                    {spillMap}
                </div>
                <div>
                    {board[0][0]}
                </div>
                <div className="hand-blue">
                    Blue Hand:
                    <div className="hand-blue-1" onClick={() => console.log(blueHand[0])}>
                        {blueHand[0]}
                    </div>
                    <div className="hand-blue-2" onClick={() => console.log(blueHand[1])}>
                        {blueHand[1]}
                    </div>
                </div>
                <br />
            </div>
        </div>
    )
}

export default Board;


