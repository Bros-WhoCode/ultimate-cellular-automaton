import React, {useContext, useState} from 'react';
import CellRow from './CellRow';
import { ruleSetContext, worldContext } from '../pages/Home';

import '../styles/World.css';


export const World = () => {

    const [ruleSet, ] = useContext(ruleSetContext)
    const [world, dispatch] = useContext(worldContext);

    const [simulation, setSimulation] = useState(null);
    const [simText, setSimText] = useState('Play');
    
    const clear = () => {
        dispatch({type : 'CLEAR', value: null});
    }

    const simulate = () => {
        dispatch({type : 'SIMULATING', value: ruleSet});
    }

    const toggleSimulation = () => {
        if(simulation){
            clearInterval(simulation);
            setSimulation(null);
            setSimText('Play');
        }else{
            setSimulation(setInterval(simulate, 50));
            setSimText('Pause');
        }
    }

    return (
        <div className="world-container">
            {
                world.cells.map((row, i) => <CellRow i={i} key={i} row={row}></CellRow>)
            }
            <button className="world-btn" onClick={(e) => toggleSimulation()}>{simText}</button>
            <button className="world-btn" onClick={(e) => dispatch({type : 'CHANGE_STATE'})} >Load</button>
            <button className="world-btn" onClick={(e) => simulate()}>Step It</button>
            <button className="world-btn" onClick={(e) => clear()}>Clear</button>
        </div>
    );
}

export default World;