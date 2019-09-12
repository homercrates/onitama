import React, { useState, useEffect } from 'react';

const RenderMap = (props) => {
    const [currentTile, setCurrentTile] = useState([]);

    useEffect(() => {
        console.log(currentTile)
    }, [currentTile])

    return (
        <div className="boardBorder">
            {props.map((key, index) => (
                <React.Fragment key={index}>
                    {key.map((i, ii) => (

                        <div
                            key={`${i}${index}${ii}`}
                            id={`${index}${ii}`}
                            className="innerPiece"
                            onClick={() => {
                                setCurrentTile([index, ii])
                            }} >
                            {i}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
};

export default RenderMap;


