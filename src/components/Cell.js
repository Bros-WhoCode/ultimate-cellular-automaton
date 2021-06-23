import React, { useContext, useState, useEffect } from 'react';

import { worldContext, sizeContext, convertVwToPx, convertVhToPx } from '../pages/Home';

import '../styles/Cell.css';

const Cell = ({i, j}) => {

    const dim = useContext(sizeContext);

    const [styles, setStyles] = useState({
        backgroundColor : 'white',
        height : `${dim}px`,
        width : `${dim}px`
    });

    const [world, dispatch] = useContext(worldContext);
    const [isAlive, setIsAlive] = useState(world.cells[i][j]);

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

    }, [isAlive]);

    useEffect(() => {
        setIsAlive(world.cells[i][j]);
    }, [world]);

    return (
        <div onClick={(e) => toggleLife()} style={styles} className="cell-container"></div>
    );

}

export default Cell;