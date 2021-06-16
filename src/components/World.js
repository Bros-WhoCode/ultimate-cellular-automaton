import React, { useEffect, useState } from 'react';

import '../styles/World.css';

import {Cell, CellComponent} from './Cell';


export const WorldComponent = ({rows, cols, rowHeight, colWidth}) => {

    const InitialWorld = () => {

        const cells = new Array(rows);
        for(let i = 0; i < rows; i++){
            cells[i] = new Array(cols);
        }

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                cells[i][j] = new Cell(i, j, false);
            }
        }

        cells[0][0].state = true;
        cells[0][cols-1].state = true;
        cells[rows-1][0].state = true;
        cells[rows-1][cols-1].state = true;

        return cells;
    }

    const [worldState, setWorldState] = useState(InitialWorld());

    return (
        <div className="world-container">
            {worldState.map((cellRow, i) => (
                    <div className="world-cell-row" key={i}>
                        {cellRow.map((cell, j) => <CellComponent key={j} cell={cell} worldState={worldState} setWorldState={setWorldState}/>)}
                    </div>
            ))}
            <button onClick={(e) => {console.log(worldState);}}>Submit</button>
        </div>
    );
}

// export default ;