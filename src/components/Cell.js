import React, { useEffect, useState } from 'react';

import '../styles/Cell.css';

export class Cell {

    constructor(i, j, state, rows, cols){
        this.i = i;
        this.j = j;
        this.state = state;
        this.rows = rows;
        this.cols = cols;
    }

    isValid(i, j){
        return (i >= 0 && i < this.rows) && (j >= 0 && j < this.cols)
    }

    getNeighbors(){
        let neighbors = [];
        for(let i = this.i - 1; i < this.i + 2; i++){
            for(let j = this.j - 1; j < this.j + 2; j++){
                if(this.isValid(i, j)){
                    neighbors.push({i , j});
                }else{
                    neighbors.push({i : -1, j : -1});
                }
            }
        }
        return neighbors;
    }

}


export const CellComponent = ({worldState, cell, setWorldState}) => {

    const [styles, setStyles] = useState({
        'backgroundColor' : 'white',
    });

    const [isAlive, setIsAlive] = useState(cell.state);

    const bringAlive = (e) => {
        e.preventDefault();
        
        setWorldState(worldState => {
            cell.state = !cell.state;
            return worldState;
        });
        console.log(worldState);

        setIsAlive(cell.state);
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
        setIsAlive(cell.state);
    }, [worldState])

    return (
        <div 
            onClick={bringAlive}
            className="cell-container" style={styles}
        ></div>
    );

}

export default {CellComponent, Cell};