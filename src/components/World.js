import React, {useContext, useEffect, useRef, useState} from 'react';
import CellRow from './CellRow';
import Flipper from './Flipper';
import { worldContext, convertVhToPx, convertVwToPx, sizeContext, ruleListContext } from '../pages/Home';

import { StateNames } from './Reducers/WorldReducer';

import '../styles/World.css';


export const World = () => {

    const [world, dispatch] = useContext(worldContext);
    const [ruleList, ] = useContext(ruleListContext);

    const [simulation, setSimulation] = useState(null);

    const clear = () => {
        dispatch({type : 'CLEAR', value: null});
    }

    const simulate = () => {
        dispatch({type : 'SIMULATING', data : {ruleList}});
    }

    const toggleSimulation = () => {
        if(simulation){
            clearInterval(simulation);
            setSimulation(null);
        }else{
            setSimulation(setInterval(simulate, 100));
        }
    }

    const stateChange = (left) => {
        dispatch({type : "CHANGE_STATE", data : left});
    }

    const changeDim = (rows) => {
        if(rows){
            return (left) => {
                if(left){
                    dispatch({type : "CHANGE_DIM", data : {increase: false, rows : world.rows - 1, cols : world.cols}})
                }else{
                    dispatch({type : "CHANGE_DIM", data : {increase: true, rows : world.rows + 1, cols : world.cols}})
                }
            }
        }else{
            return (left) => {
                console.log("Changing....C");
                if(left){
                    dispatch({type : "CHANGE_DIM", data : {increase: false, rows : world.rows, cols : world.cols - 1}})
                }else{
                    dispatch({type : "CHANGE_DIM", data : {increase: true, rows : world.rows, cols : world.cols + 1}})
                }
            }
        }
    }

    return (
        <div className="world-container">

            <div className="world-wrapper">
                <div className="world-grid">
                {
                    world.cells.map((row, i) => <CellRow i={i} key={i} row={row}></CellRow>)
                }
                </div>
            </div>

            <div className="world-controls">
                <div className="world-simlation-buttons">
                    {!simulation && <div className="world-btn world-play-pause" onClick={(e) => toggleSimulation()}><i class="bi bi-play"></i></div>}
                    {simulation && <div className="world-btn world-play-pause" onClick={(e) => toggleSimulation()}><i class="bi bi-pause"></i></div>}
                    <div className="world-btn world-step-it" onClick={(e) => simulate()}><i class="bi bi-chevron-double-right"></i></div>
                </div>
                <div className="world-state-buttons">
                    <Flipper state={StateNames[world.currentState]} callback={stateChange}></Flipper>
                </div>
                <div className="world-grid-controls">
                    <Flipper state={world.rows} callback={changeDim(true)}></Flipper>
                    <Flipper state={world.cols} callback={changeDim(false)}></Flipper>
                    <div className="world-btn world-clear" onClick={(e) => clear()}><i class="bi bi-x-lg"></i></div>
                </div>
            </div>
        </div>
    );
}

export default World;