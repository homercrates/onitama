import React from 'react';

import Board from '../board/Board';

const GameView = () => {
    return (

        <div>
            <hr />
            <p>NEW BUG I am actually reversing the cards right its just not posting to
                state when i need it.  its suppsed to tave reverse and setFlippedValue
                but that is delayed about a turn later it shows up

            </p>
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