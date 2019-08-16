import React, {useState} from 'react';



const Board = () => {
    const [row0] = useState([[0,0],[0,1],[0,2],[0,3],[0,4]]);
    const [row1] = useState([[1,0],[1,1],[1,2],[1,3],[1,4]]);
    const [row2] = useState([[2,0],[2,1],[2,2],[2,3],[2,4]]);
    const [row3] = useState([[3,0],[3,1],[3,2],[3,3],[3,4]]);
    const [row4] = useState([[4,0],[4,1],[4,2],[4,3],[4,4]]);

        // not rendering triggering just not render not sure
    const renderBoard = (whichRow) => {
        whichRow.map((index) => {
            console.log('board render triggered');
            return 'hey'
            /*
            return (
                <div className="piece" >
                    {index} 
                    <p>p</p>
                </div>
            )
            */
        });
    }
    return (
        <div className="board">
            <div className="board">{renderBoard(row0)}</div>
            <div className="board">{row1}</div>
            <div className="board">{row2}</div>
            <div className="board">{row3}</div>
            <div className="board">{row4}</div>
        </div>
    )
}

export default Board;