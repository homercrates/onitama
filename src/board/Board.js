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
    // set a reversed value of active card
    const [flippedActiveValue, setFlippedActiveValue] = useState([]);
    // set possible moves
    const [possibleMoves, setPossibleMoves] = useState([]);
    // set move button visable
    const [moveButtonVisable, setMoveButtonVisable] = useState(false);

    // red and blue disable state
    const [handShow, setHandShow] = useState({ red: "redHandCard", blue: "disabledButton" });

    // change later starting hand 
    // deal hands
    const dealStartingHand = () => {
        const possibleHand = [[[1, 3], [0, 2]]]
        //setRedHand(possibleHand[0],possibleHand[1]);
        //setBlueHand(possibleHand[2],possibleHand[3]);
        setMiddleHand(possibleHand[0]);
    }


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


    useEffect(() => {
        console.log('FLIPPEDACTIVE CHANGED IN USEEFFECT')
        console.log(flippedActiveValue, "flipped")
        //setMiddleHand(flippedActiveValue);
        setMiddleHand(flippedActiveValue);
    }, [flippedActiveValue])

    const movingTo = () => {
        // obviouslt dont log this return or set
        // set value to a state of movingTo  so we can add movingTo with currentTile
        setDestination([(currentTile[0] + activeCard[0][0]), (currentTile[1] + activeCard[0][1])])
        // click lets put a hand here to setActiiveCard then that will calc in movingTo give us destination
        // right now we are only auto chosing the first option in the activeCard 
    }

    // use this but change the name later
    // const buttonTest = () => MoveHandler(testOneMove);
    const submitTurn = () => {

        testOneMove(currentTile[0], currentTile[1], destination[0], destination[1])

        setRedsTurn(!redsTurn);
        setDestination([]);
        setPossibleMoves([]);
        setCurrentTile([]);
        setMoveButtonVisable(false);
        setMessage("click tile to move from");

        reverseValue(activeCard);

        //let reversedSwapCard = reverseValue(activeCard);
        //setFlippedActiveValue(reversedSwapCard);
        //console.log(flippedActiveValue, "this shoudl conatinREVERS");
        //console.log(reversedSwapCard, "REVSERED NOW PUT BACK TO MIDDLE HAND");
        redsTurn ? cardSwap(redHand) : cardSwap(blueHand);
        console.log(flippedActiveValue, "HERE IS POST SWAPCARD WE SHOULD HAVE FLIPPED VALUE HERE")
    }
    // lets take card used. put it to middle, send middle card to empty hand
    const cardSwap = (whichHand) => {
        //let tempMidHold = activeCard;
        //let tempOtherHand = 
        console.log(middleHand, '=middleHand starting before carSwap moves"')
        let switchingCard = whichHand.indexOf(activeCard);
        let newHand = [...whichHand]
        newHand[switchingCard] = middleHand;

        redsTurn ? setRedHand(newHand) : setBlueHand(newHand);
        //setMiddleHand(flippedActiveValue);
        setMiddleHand(flippedActiveValue);

        console.log(flippedActiveValue, "FLIPPED ACTIVE VALUE")
        console.timeLog('activeCard now in middleHand=', activeCard);
        console.log(middleHand, "=after starting cardSwap moves")
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
        let convert = [...thingToReverse];
        let reversed = convert.map((index) => {
            let firstLevel = index.map((i) => {
                return i = -i;
            })
            return firstLevel;
        });
        console.log(reversed, "REVERSED REVERSED");
        setFlippedActiveValue(reversed);
        //return reversed;
        console.log(flippedActiveValue, "FLIPPPPPPED ACTIVE CALLLLUUUUUE");
        // problem is here?
        // we setFlipped  but its delayed the card converts 
        // but doesnt show up in middleHand til a turn later
    }

    const choseMove = () => {
        setMoveButtonVisable(false);
        setDestination([])
        setPossibleMoves([])
        setMessage('Chose Tile to move from, click lock choice');
    }

    // one time load to set middleHand
    // should expand dealtStartingHand to deal red and blue too
    useEffect(() => { dealStartingHand(); }, [])

    useEffect(() => {
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


