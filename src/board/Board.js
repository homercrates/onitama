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

    // game message state
    const [message, setMessage] = useState('Click Start');
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
    const [middleHand, setMiddleHand] = useState([[1, 3], [0, 2]])

    // set current tile state
    const [currentTile, setCurrentTile] = useState([]);
    // set the movingTo state
    const [destination, setDestination] = useState([]);
    // set active card
    const [activeCard, setActiveCard] = useState([]);
    // set possible moves
    const [possibleMoves, setPossibleMoves] = useState([]);
    // set move button visable
    const [moveButtonVisable, setMoveButtonVisable] = useState(false);

    // red and blue disable state
    const [handShow, setHandShow] = useState({ red: "redHandCard", blue: "disabledButton" });

    // one time lets reverse blueHand this happens once 
    //to convert blueHand to negative beofre game starts.
    useEffect(() => {
        let tempHold = [...blueHand]

        let convertedHand = tempHold.map((index) => {
            let firstLayer =
                index.map((i) => {

                    let secondArr =
                        i.map((j) => {
                            return j = -j
                        })
                    return secondArr;
                })

            return firstLayer;
        })

        setBlueHand(convertedHand)
    }, [])

    const testOneMove = (fromA, fromB, toA, toB) => {
        let hold = [...board];
        let extractedPiece = hold[fromA][fromB]
        let placePiece = hold[toA][toB]

        if (extractedPiece === 'empty') throw new Error('no piece to move');

        if (redsTurn && extractedPiece[0] === 'B') throw new Error('Can Only Move Your Piece');
        if (!redsTurn && extractedPiece[0] === 'R') throw new Error('Can Only Move Your Piece');
        // check first if piece is R or B if its same piece as destnation it can not move
        // if its not same team or empty square then... do legal move.
        if (extractedPiece[0] !== placePiece[0]) {
            hold[fromA][fromB] = "empty"
            hold[toA][toB] = extractedPiece
        } else {
            throw new Error('Illegal Move Tile Occupied by You')
        }

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
        console.log('index of: ', redHand.indexOf(activeCard));
        setRedsTurn(!redsTurn);
        setDestination([]);
        setPossibleMoves([]);
        setCurrentTile([]);
        setMoveButtonVisable(false);
        setMessage("click tile to move from");
        reverseValue(activeCard)
        redsTurn ? cardSwap(redHand) : cardSwap(blueHand);
    }

    // lets take card used. put it to middle, send middle card to empty hand
    const cardSwap = (whichHand) => {
        //let tempMidHold = activeCard;
        //let tempOtherHand = 
        console.log(activeCard, "---activecard")
        console.log(redHand.indexOf(activeCard), '--index/of')
        let switchingCard = whichHand.indexOf(activeCard);
        let newHand = [...whichHand]
        newHand[switchingCard] = middleHand;
        console.log('ReformedRedHand', newHand);
        console.log(activeCard, '--activeCard');
        redsTurn ? setRedHand(newHand) : setBlueHand(newHand);
        setMiddleHand(activeCard);
        //  breaking here     remember  siwthc the card m[put middle in here

    }

    // hand needs activeHand passed
    const calcPossibleMoves = (hand) => {
        let tempHold = [];
        hand.map(card => {
            let add = [(card[0] + currentTile[0]), (card[1] + currentTile[1])];
            tempHold.push(add);
        })
        setPossibleMoves(tempHold);
        setMoveButtonVisable(true);
        setMessage("click tile to move too");
    }

    const canMoveTo = (index, ii) => {
        let hold = [...board];
        let found = false
        possibleMoves.forEach(i => {
            if (i[0] === index && i[1] === ii) { found = true }
            //if (redsTurn && (hold[index][i] === "RS" || "RM")) { found = false }
        })
        return found
    }

    const reverseValue = (thingToReverse) => {
        thingToReverse.forEach((index) => {
            index.map((i) => {
                console.log(i, '=i(insidereverseValindex.map)')
                console.log(index, '=index(insidereverseValindex.map)')
                index[i] = -index[i]
                console.log(index[i], 'reversedup');
            })
            //index[i] = -index[i];

            // may be a break here i am getting NaN on some results
        })
    }

    const choseMove = () => {
        setMoveButtonVisable(false);
        setDestination([])
        setPossibleMoves([])
        setMessage('Chose Tile to move from, click lock choice');
    }

    useEffect(() => {
        console.log('current possible moves: ', possibleMoves);
        board;
        console.log('rerenderBoard');
    }, [possibleMoves, moveButtonVisable])

    useEffect(() => {
        redsTurn ?
            setHandShow({ red: "redHandCard", blue: "disabledButton" })
            :
            setHandShow({ red: "disabledButton", blue: "blueHandCard" });
    }, [redsTurn, redHand, blueHand, middleHand])
    /*
            (redsTurn && (i == 'RS' || 'RM')) ? "innerPiece" : "disabledInnerPiece"
        const checkSquareClickable = (i) => {
            redsTurn && (i === 'RS' || 'RM') ? 
        }
        */
    // if activeCard ===    key  flag possible 
    // i need to render  the background if true
    return (
        <div>
            {/* RedHand */}
            <div className="redHandContainer" >
                <div className={handShow.red}
                    onClick={() => setActiveCard(redHand[0])}
                >
                    {redHand[0]}
                </div>
                <div className={handShow.red}
                    onClick={() => setActiveCard(redHand[1])}
                >
                    {redHand[1]}
                </div>
            </div>
            <div className="boardContainer">
                <div className="orderButtonsContainer">
                    <button style={{ backgroundColor: 'lightgrey' }} onClick={submitTurn} >Submit Turn</button>
                    <button onClick={() => calcPossibleMoves(activeCard)}>Lock Choice</button>
                    {moveButtonVisable ? (<button onClick={choseMove}>Undo</button>) : null}
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
                                            if (moveButtonVisable) {
                                                setDestination([index, ii]);
                                            } else {
                                                setCurrentTile([index, ii])
                                            }
                                        }}
                                        style={{
                                            backgroundColor: canMoveTo(index, ii) ? 'white' : 'grey'
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
                                <p>{message}</p>
                            </div>
                        </div>
                        <div className="middleHandContainer">
                            <div className="middleHandCard">
                                {middleHand}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {/* Blue Hand */}
            <div className="blueHandContainer">
                <div className={handShow.blue}
                    onClick={() => setActiveCard(blueHand[0])}
                >
                    {blueHand[0]}
                </div>
                <div className={handShow.blue}
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
                <button onClick={movingTo}>calc moves</button>
                {activeCard}
                <br />
                {possibleMoves} :possible moves

            </div>
        </div >
    )
}

export default Board;


