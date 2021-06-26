import React from 'react';

import '../styles/Flipper.css';

const Flipper = ({state, callback}) => {

    return (
        <div className="flipper-container">
            <div className="flipper-left" onClick={(e) => callback(true)}><i className="bi bi-chevron-left"></i></div>
            <div className="flipper-content">{state}</div>
            <div className="flipper-right" onClick={(e) => callback(false)}><i className="bi bi-chevron-right"></i></div>
        </div>
    );

}

export default Flipper;