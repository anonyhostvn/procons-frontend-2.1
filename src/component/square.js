import React from 'react';

const Square = ({color, children}) => {
    return (
        <div style={{
            backgroundColor: color,
            border: '1px solid black',
            width: '100%', height: '100%'
        }}
        >
            {children}
        </div>
    )
};

export default Square;