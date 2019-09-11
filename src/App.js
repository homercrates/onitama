import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import GameView from './view/GameView';

const App = () => {
    return (
        <React.StrictMode>
            <div>
                <GameView />
            </div>
        </React.StrictMode>
    );
};

render(<App />, document.getElementById("root"));
