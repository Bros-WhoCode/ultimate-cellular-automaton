import React, { useEffect, useState } from 'react';

import '../styles/Cell.css';

export class Cell {

    constructor(i, j, state){
        this.i = i;
        this.j = j;
        this.state = state;
    }

}


export const CellComponent = ({cell, setWorldState}) => {

    const [styles, setStyles] = useState({
        'backgroundColor' : 'white'
    });

    const [isAlive, setIsAlive] = useState(cell.state);

    const bringAlive = (e) => {
        e.preventDefault();
        setWorldState(worldState => {
            cell.state = !cell.state;
            return worldState;
        });

        setIsAlive(cell.state);
    }

    useEffect(() => {

        if(isAlive){
            setStyles({
                'backgroundColor' : 'black'
            });
        }else{
            setStyles({
                'backgroundColor' : 'white'
            });
        }

    }, [isAlive]);

    return (
        <div 
            onClick={bringAlive}
            className="cell-container" style={styles}
        ></div>
    );

}

export default {CellComponent, Cell};