import React from 'react';

import Board from '../board/Board';

const GameView = () => {
    return (

        <div>
            Here in lay the game view.
                <p>we need to show red 2 cards</p>
            <p>we need to show blue 2 cards</p>
            <p> we need to show the middle flating card</p>
            <hr />
            <p>we need to show the game board</p>
            <p>we need to render which peices are on that game board</p>
            <p>we need to show possible moves</p>
            <p> then we need to render the moves</p>
            <hr />
            <p>we need to show whos turn</p>
            <hr />
            <p>i think i may need the Context on this level and render everything from Here
                Keep it all simple here leave a Context wrapper here above all the components comming in.

            </p>
            <hr />
            <p>have the board state hold all the states</p>
            <Board />
        </div>

    )
}

export default GameView;