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
    const [redHand, setRedHand] = useState([[[0, 1], [1, 0]], [[2, 0], [0, 2]]])

    // example of useEffect everytime the board renders i dont want to log that
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
    // set fromA fromB by getting value of square. 
    // that is {key} and {ii} from RenderMap
    const choseFromSquare = () => {
        // lets first just get the values logged
        console.log(RenderMap.key.value);
    };

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
            <div className="boardContainer">
                <button style={{ backgroundColor: 'lightgrey' }} onClick={buttonTest} >testMove</button>
                <div>
                    board renders here:
                        {spillMap}
                </div>
            </div>
            <div>
                <div>
                    {board[0][0]}
                </div>
                <div className="hand-red">
                    red Hand:
                    <div className="hand-red-1" onClick={() => console.log('redHand 0:', redHand[0])}>
                        {redHand[0]}
                    </div>
                    <div className="hand-red-2" onClick={() => console.log('redHand 1:', redHand[1])}>
                        {redHand[1]}
                    </div>

                </div>
                <br />
            </div>
        </div >
    )
}

export default Board;


