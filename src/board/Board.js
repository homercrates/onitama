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

    // game phase state
    const [phase, setPhase] = useState('Click Start');
    //whos turn
    const [redsTurn, setRedsTurn] = useState(true);

    // hand state
    const [redHand, setRedHand] = useState([
        [[1, 0], [0, 1], [1, 1]],
        [[2, 0], [0, 2]]
    ]);
    const [blueHand, setBlueHand] = useState([
        [[1, 0], [0, 1], [1, 1]],
        [[2, 0], [0, 2]]
    ]);

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
    const submitTurn = () => {
        console.log('click')
        testOneMove(currentTile[0], currentTile[1], destination[0], destination[1])
        setRedsTurn(!redsTurn);
    }

    // if destination is the calc being sent toA toB
    // need to make a sim functon displaying all possible moves

    // hand needs activeHand passed
    const calcPossibleMoves = (hand) => {
        let tempHold = [];
        hand.map(card => {
            let add = [(card[0] + currentTile[0]), (card[1] + currentTile[1])];
            tempHold.push(add);
        })
        setPossibleMoves(tempHold);
        console.log(tempHold, ' : tempHold')
        console.log("possmove: ", possibleMoves);
        console.log("cuurent Tile: ", currentTile);
        console.log(activeCard, "active")
    }

    const canmoveto = (index, ii) => {
        let found = false
        possibleMoves.forEach(i => {
            if (i[0] === index && i[1] === ii) found = true
        })
        return found
    }
    useEffect(() => {
        console.log('current possible moves: ', possibleMoves);
        board;
        console.log('rerenderBoard');
    }, [possibleMoves])

    // make a function to return true or not is this a possiblemove
    const checkForPos = (arr, val) => {
        console.log(arr.some(arrVal => arr === arrVal));
        return arr.some(arrVal => arr === arrVal)
    }
    // render the board indiv <div>s  can control style here

    // if activeCard ===    key  flag possible 
    // i need to render  the background if true
    return (
        <div>
            {/* RedHand */}
            <div className="redHandContainer">
                <div className="redHandCard"
                    onClick={() => setActiveCard(redHand[0])}
                >
                    {redHand[0]}
                </div>
                <div className="redHandCard"
                    onClick={() => setActiveCard(redHand[1])}
                >
                    {redHand[1]}
                </div>
            </div>
            <div className="boardContainer">
                <div className="orderButtonsContainer">
                    <button style={{ backgroundColor: 'lightgrey' }} onClick={submitTurn} >Submit Turn</button>
                    <button onClick={movingTo}>Lock Choice</button>
                </div>
                <div className="boardContainer">
                    {/* board renders here */}
                    <div className="boardBorder">

                        {board.map((key, index) => (
                            <React.Fragment key={index}>
                                {key.map((i, ii) => (
                                    < div
                                        key={`${i}${index}${ii}`}
                                        id={`${index}${ii}`}
                                        className="innerPiece"
                                        onClick={() => {
                                            setCurrentTile([index, ii])
                                        }}
                                        style={{
                                            backgroundColor: canmoveto(index, ii) ? 'white' : 'grey'
                                        }}
                                    >
                                        {i}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}

                    </div>
                    <div>
                        <div>
                            Display active card
                            <br />
                            {activeCard}
                        </div>
                        <div className="directions">
                            <div className="whosturn">
                                <h3>{redsTurn ? "Red's Turn" : "Blue's Turn"}</h3>
                            </div>
                            <div className="phase">
                                <p>{phase}</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {/* Blue Hand */}
            <div className="blueHandContainer">
                <div className="blueHandCard"
                    onClick={() => setActiveCard(blueHand[0])}
                >
                    {blueHand[0]}
                </div>
                <div className="blueHandCard"
                    onClick={() => setActiveCard(blueHand[1])}
                >
                    {blueHand[1]}
                </div>
            </div>
            <div>
                current tile:
                {currentTile}
                <br />
                {destination} destination
                <br />
                {destination[0]} destination-0
                <br />
                {destination[1]} destination-1
                <button onClick={() => calcPossibleMoves(activeCard)}>calc moves</button>
                {activeCard}
                <br />
                {possibleMoves} :possible moves

            </div>
        </div >
    )
}

export default Board;


