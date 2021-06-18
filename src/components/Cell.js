import React, { useContext, useState, useEffect } from 'react';

import { worldContext } from '../pages/Home';

import '../styles/Cell.css';

const Cell = ({i, j}) => {

    const [styles, setStyles] = useState({
        'backgroundColor' : 'white',
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

        console.log("Cell Clicked");

    }

    useEffect(() => {

        if(isAlive){
            setStyles({
                'backgroundColor' : 'black',
            });
        }else{
            setStyles({
                'backgroundColor' : 'white',
            });
        }

    }, [isAlive]);

    useEffect(() => {
        setIsAlive(world.cells[i][j]);
    }, [world]);

    return (
        <div onClick={toggleLife} style={styles} className="cell-container"></div>
    );

}

export default Cell;