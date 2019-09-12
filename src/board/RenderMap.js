import React from 'react';

const RenderMap = (props) => {
    console.log(props)


    return (
        <div className="boardBorder">
            {props.map((key, index) => (
                <React.Fragment key={index}>
                    {key.map((i, ii) => (

                        <div
                            key={`${i}${index}${ii}`}
                            className="innerPiece"
                            onClick={() => console.log(`${index}${ii}`)} >
                            {i}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
    /*    
            return (
                <div className="boardBorder">
                    border
                    {props.map((key, i) => (
                        <div className="innerPiece">
                            {key[i]}
                        </div>))}
                </div>
            );
      */
};

export default RenderMap;


// trying to map right
// board[0][0]  board [0][1]