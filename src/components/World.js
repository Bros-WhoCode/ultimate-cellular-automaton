import React, {useContext, useState} from 'react';
import CellRow from './CellRow';
import { worldContext } from '../pages/Home';

import '../styles/World.css';


export const World = () => {

    const [world, dispatch] = useContext(worldContext);

    const [simulation, setSimulation] = useState(null);
    const [simText, setSimText] = useState('Play');
    
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
            setSimText('Play');
        }else{
            setSimulation(setInterval(simulate, 50));
            console.log("ON");
            setSimText('Pause');
        }
    }

    return (
        <div className="world-container">
            {
                world.cells.map((row, i) => <CellRow i={i} key={i} row={row}></CellRow>)
            }
            <button className="world-btn" onClick={() => toggleSimulation()}>{simText}</button>
            <button className="world-btn" onClick={(e) => dispatch({type : 'CHANGE_STATE'})} >Load</button>
            <button className="world-btn" onClick={() => simulate()}>Step It</button>
            <button className="world-btn" onClick={() => clear()}>Clear</button>
        </div>
    );
}

export default World;