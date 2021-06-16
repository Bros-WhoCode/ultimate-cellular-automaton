import React, { useEffect, useState } from 'react';

import '../styles/World.css';

import {Cell, CellComponent} from './Cell';


const RenderWorld = ({worldState}) => {
    return(
        <>
            {worldState.map((cellRow, i) => (
                    <div className="world-cell-row" key={i}>
                        {cellRow.map((cell, j) => <CellComponent key={j} cell={cell}></CellComponent>)}
                    </div>
            ))}
        </>
    );
}


export const WorldComponent = ({rows, cols, rowHeight, colWidth}) => {

    const InitialWorld = () => {

        const cells = new Array(rows);
        for(let i = 0; i < rows; i++){
            cells[i] = new Array(cols);
        }

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                cells[i][j] = Cell(i, j, false);
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
            <RenderWorld worldState={worldState}></RenderWorld>
        </div>
    );
}

// export default ;