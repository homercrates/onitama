import React, { useState, useEffect } from 'react';

import RenderMap from './RenderMap';
import Hand from '../hand/Hand';

const Board = () => {
    const [board, setBoard] = useState([
        ['RS', 'RS', 'RM', 'RS', 'RS'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty'],
        ['BS', 'BS', 'BM', 'BS', 'BS']
    ]);
    const [blueHand, setBlueHand] = useState(['player blue hand 1', ['player blue hand 2']])

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
                <Hand />
                blueHand from board: {blueHand}
                <br />
                blueHand from Hand: {Hand.blueHand}
            </div>
        </div>
    )
}

export default Board;


