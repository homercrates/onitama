import React from 'react';

import Board from '../../components/board/board';
import RedCards from '../../components/redCards/redCards';
import LimboCard from '../../components/limboCard/limboCard';
import BlueCards from '../../components/blueCards/blueCards';
import Defeated from '../../components/defeated/defeated';

const GameScreen = () => {

    return (
        <div>
            <div className="redPlayerCards">
                <RedCards />
            </div>
            <div className="middleBoard">
                <div className="limboCard">
                    <LimboCard />
                  </div>
                <div className="board">
                    <Board />
                </div>
                <div className="defeated">
                    <Defeated />
                </div>
            </div>
            <div className="bluePlayerCards">
                <BlueCards />
            </div>
            
        </div>
    )
}

export default GameScreen;