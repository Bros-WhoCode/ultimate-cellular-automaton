import React, { useContext, useState, useEffect } from 'react';

import { worldContext, convertVwToPx, convertVhToPx } from '../pages/Home';

import '../styles/Cell.css';

const Cell = ({i, j}) => {

    
    const [world, dispatch] = useContext(worldContext);
    const [isAlive, setIsAlive] = useState(world.cells[i][j]);
    const [dim, setDim] = useState(world.cellSize);
    

    const [styles, setStyles] = useState({
        backgroundColor : 'white',
        height : `${dim}px`,
        width : `${dim}px`
    });

    const toggleLife = (e) => {

        if(world.currentState === 0){

            if(!isAlive){
                dispatch({data : {i, j}, type : "TOGGLE_ON"});
            }else{
                dispatch({data : {i, j}, type : "TOGGLE_OFF"});
            }

        }

    }


    useEffect(() => {

        if(isAlive){
            setStyles({
                backgroundColor : 'black',
                height : `${dim}px`,
                width : `${dim}px`
            })
        }else{
            setStyles({
                backgroundColor : 'white',
                height : `${dim}px`,
                width : `${dim}px`
            })
        }

    }, [isAlive, dim]);

    useEffect(() => {
        setIsAlive(world.cells[i][j]);
        setDim(world.cellSize);
    }, [world]);

    return (
        <div onClick={(e) => toggleLife()} style={styles} className="cell-container"></div>
    );

}

export default Cell;