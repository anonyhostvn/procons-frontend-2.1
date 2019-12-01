import React from 'react';
import {Icon} from 'antd';

const Agent = ({iconType}) => {

    return (
        <div
            style={{
                fontSize: 25,
            }}
        >
            <Icon type={iconType}/>
        </div>
    );
};

export default Agent;