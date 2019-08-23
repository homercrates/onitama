import React, {useState} from 'react';


const Board = () => {
    const [row0] = useState([[0,0],[0,1],[0,2],[0,3],[0,4]]);
    const [row1] = useState([[1,0],[1,1],[1,2],[1,3],[1,4]]);
    const [row2] = useState([[2,0],[2,1],[2,2],[2,3],[2,4]]);
    const [row3] = useState([[3,0],[3,1],[3,2],[3,3],[3,4]]);
    const [row4] = useState([[4,0],[4,1],[4,2],[4,3],[4,4]]);

    const [player1Moves] = useState([[1,0],[0,1],[0,-1],[1,-1],[1,1]],[[2,0]]);
    const [possibleMoves, setPossibleMoves] = useState('hi');

    const [currentTile, setCurrentTile] = useState([0,0]);

    function spitBoard(row) {
        const giveCord = (e) => {
            setCurrentTile(e.target.id);
            adjustPossibleMoves(e.target.id);
        }
        
        return (
            <div className="board" id={row}>{row.map((index) =>
                <div className="piece" id={index} key={index} onClick={giveCord}>
                    {index}
                </div>
            )}</div>
        )
    }

    const adjustPossibleMoves = (newTile) => {
        setPossibleMoves('adjustedPossibleMoves to account for: ' + newTile);
        console.log(player1Moves);
        console.log(newTile);
        // now when we set a new possible move target
        // lets get the possible moves by adusting the math of currentTile and possibleMoves array
        const possibleCurrentArr = player1Moves.map((arr, i) => {
            return arr + newTile[i];
        });
        console.log(possibleCurrentArr);
    }

    return (
        <div>
        <div className="board">
            {spitBoard(row0)}
            {spitBoard(row1)}
            {spitBoard(row2)}
            {spitBoard(row3)}
            {spitBoard(row4)}
        </div>
        <div>
            {currentTile}
        </div>
        <div>
            {possibleMoves}
        </div>
        </div>
    )
}

export default Board;