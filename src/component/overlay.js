import React from 'react';

const Overlay = ({color}) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: color,
                opacity: 0.5,
                zIndex: 1
            }}
        >
        </div>
    )
};

export default Overlay;