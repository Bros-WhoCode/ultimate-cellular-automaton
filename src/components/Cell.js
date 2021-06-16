import React, { useEffect, useState } from 'react';

import '../styles/Cell.css';

// export const Cell = (i, j, state) => {
//     return {
//         i, j, state
//     }
// }

export const CellComponent = () => {

    const [isAlive, setIsAlive] = useState(false);

    const [style, setStyle] = useState({
        backgroundColor : 'white'
    });

    useEffect(() => {
        if(isAlive){
            setStyle({
                backgroundColor : 'black',
            })
        }
    }, []);

    return (
        <div className="cell-container" style={style}></div>
    );
}

export default {CellComponent, Cell};