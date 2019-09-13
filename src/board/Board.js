import React, { useState, useEffect } from 'react';


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
    const [redHand, setRedHand] = useState([
        [[1, 0], [1, 0]],
        [[2, 0], [0, 2]]
    ])

    // set current tile state
    const [currentTile, setCurrentTile] = useState([]);
    // set the movingTo state
    const [destination, setDestination] = useState([]);
    // set active card
    const [activeCard, setActiveCard] = useState([]);
    // set possible moves
    const [possibleMoves, setPossibleMoves] = useState([]);

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
    const movingTo = () => {
        // obviouslt dont log this return or set
        // set value to a state of movingTo  so we can add movingTo with currentTile
        setDestination([(currentTile[0] + activeCard[0][0]), (currentTile[1] + activeCard[0][1])])
        console.log('activeCard: ', activeCard);
        console.log('active card 0', activeCard[0][0]);
        console.log('active card 1', activeCard[0][1]);
        console.log('destination: ', destination);
        // click lets put a hand here to setActiiveCard then that will calc in movingTo give us destination
        // right now we are only auto chosing the first option in the activeCard 
    }

    // use this but change the name later
    // const buttonTest = () => MoveHandler(testOneMove);
    const buttonTest = () => {
        console.log('click')
        testOneMove(currentTile[0], currentTile[1], destination[0], destination[1])
    }

    // if destination is the calc being sent toA toB
    // need to make a sim functon displaying all possible moves

    // hand needs activeHand passed
    function calcPossibleMoves(hand) {
        let tempHold = [];
        hand.map(move => {
            //let addMove = [...possibleMoves, [(move[0] + currentTile[0]), (move[1] + currentTile[1])]];
            //let addMove = [...possibleMoves]
            //addMove.push([(move[0] + currentTile[0]), (move[1] + currentTile[1])])

            //let copy = [[...possibleMoves], [(move[0] + currentTile[0]), (move[1] + currentTile[1])]]
            //setPossibleMoves(copy)
            console.log('first: ', [(move[0] + currentTile[0]), (move[1] + currentTile[1])])
            console.log('addMove: ', " move-", move);

            let add = [(move[0] + currentTile[0]), (move[1] + currentTile[1])];
            tempHold.push(add);
        })
        setPossibleMoves(tempHold);
        console.log(tempHold, ' : tempHold')
        console.log(" possmove: ", possibleMoves);
    }
    useEffect(() => {
        console.log('current possible moves: ', possibleMoves);
    }, [possibleMoves])

    // render the board indiv <div>s  can control style here

    // if activeCard ===    key  flag possible 
    // i need to render  the background if true
    return (
        <div>
            <div className="boardContainer">
                <button style={{ backgroundColor: 'lightgrey' }} onClick={buttonTest} >testMove</button>
                <div className="boardContainer">
                    {/* board renders here */}
                    <div className="boardBorder">
                        {board.map((key, index) => (
                            <React.Fragment key={index}>
                                {key.map((i, ii) => (
                                    <div
                                        key={`${i}${index}${ii}`}
                                        id={`${index}${ii}`}
                                        className="innerPiece"
                                        onClick={() => {
                                            setCurrentTile([index, ii])
                                        }} >
                                        {i}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                    <div>
                        lets put redHand here
                        <br />
                        <div onClick={() => setActiveCard(redHand[0])}>
                            {redHand[0]}
                        </div>
                        <br />
                        <div onClick={() => setActiveCard(redHand[1])}>
                            {redHand[1]}
                        </div>
                        <div>
                            Display active card
                            <br />
                            {activeCard}
                        </div>

                    </div>
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
                current tile:
                {currentTile}
                <br />
                {destination} destination
                <br />
                {destination[0]} destination-0
                <br />
                {destination[1]} destination-1
                <button onClick={movingTo}>movingTO test</button>
                <button onClick={() => calcPossibleMoves(activeCard)}>calc moves</button>
                {redHand[0]}
                {activeCard}
                <br />
                {possibleMoves} :possible moves
            </div>
        </div >
    )
}

export default Board;


