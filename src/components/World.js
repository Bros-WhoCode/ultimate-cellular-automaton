import React, { useEffect, useState } from 'react';

import '../styles/World.css';

import {Cell, CellComponent} from './Cell';

import {states, stateDict} from './States';

export const WorldComponent = ({rows, cols, rowHeight, colWidth}) => {

    const [initalState, setInitalState] = useState(0);
    
    const InitWorld = (rows, cols) => {
        return stateDict[states[initalState]](rows, cols);
    }

    const [worldState, setWorldState] = useState(InitWorld(rows, cols));
    
    const nextState = () => {
        let newIndex = initalState + 1;
        if(newIndex >= states.length){
            newIndex = 0
        }
        return newIndex;
    }

    const changeState = (e) => {
        setInitalState(nextState());
    }

    useEffect(() => {
        setWorldState(InitWorld(rows, cols));
    }, [initalState])


    return (
        <div className="world-container">
            {worldState.map((cellRow, i) => (
                    <div className="world-cell-row" key={i}>
                        {cellRow.map((cell, j) => <CellComponent key={j} cell={cell} worldState={worldState} setWorldState={setWorldState}/>)}
                    </div>
            ))}
            <button onClick={changeState}>{states[initalState]}</button>
        </div>
    );
}

// export default ;

