import React from 'react';

import Board from '../board/Board';

const GameView = () => {
    return (

        <div>
            <hr />
            <p>we need to show possible moves</p>
            <p> then we need to render the moves</p>
            <hr />
            <p>switchCard is hard coded to red. we need to make it dynamicaly poerate on redHand or blueHand depending on turn</p>
            <p> reverse values into blues hand upside down.</p>
            <p>and then create a win condition and check it then framework built</p>
            <hr />
            <Board />
        </div>

    )
}

export default GameView;