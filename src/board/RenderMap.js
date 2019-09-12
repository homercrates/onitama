import React from 'react';

const RenderMap = (props) => {
    console.log('boards props inside RenderMap', props)

    return (
        <div className="boardBorder">
            {props.map((key, index) => (
                <React.Fragment key={index}>
                    {key.map((i, ii) => (

                        <div
                            key={`${i}${index}${ii}`}
                            id={`${index}${ii}`}
                            className="innerPiece"
                            onClick={() => console.log(`${index}${ii}`)} >
                            {i}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
};

export default RenderMap;


