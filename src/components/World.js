import React, {createContext, useContext, useReducer} from 'react';

import CellRow from './CellRow';
import { worldContext } from '../pages/Home';

import '../styles/World.css';


export const World = () => {

    const [world, dispatch] = useContext(worldContext);

    return (
        <div className="world-container">
            {world.cells.map((row, i) => <CellRow i={i} key={i} row={row}></CellRow>)}
            <button onClick={(e) => {dispatch({type : 'CHANGE_STATE'})}} >Change</button>
        </div>
    );
}

export default World;