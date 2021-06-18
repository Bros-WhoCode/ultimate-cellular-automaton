import React, {createContext, useContext, useReducer, useState} from 'react';

import CellRow from './CellRow';
import { worldContext } from '../pages/Home';

import '../styles/World.css';


export const World = () => {

    const [world, dispatch] = useContext(worldContext);

    const [simulation, setSimulation] = useState(null);
    
    const clear = () => {
        dispatch({type : 'CLEAR'});
    }

    const simulate = () => {
        dispatch({type : 'SIMULATING'});
    }

    const toggleSimulation = (e) => {
        if(simulation){
            clearInterval(simulation);
            setSimulation(null);
            console.log("OFF");
        }else{
            setSimulation(setInterval(simulate, 50));
            console.log("ON");
        }
    }

    return (
        <div className="world-container">
            {world.cells.map((row, i) => <CellRow i={i} key={i} row={row}></CellRow>)}
            <button onClick={(e) => {dispatch({type : 'CHANGE_STATE'})}} >Change</button>
            <button onClick={toggleSimulation}>Simulate</button>
            <button onClick={simulate}>Step It</button>
            <button onClick={clear}>Clear</button>
        </div>
    );
}

export default World;