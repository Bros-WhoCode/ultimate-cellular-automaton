import React, {useEffect, useState } from 'react';
import { getSudokuInitialState } from '../components/Reducers/SudokuReducer';
import { findEmptyLocation, isSafeCell} from '../components/SudokuUtils';

import '../styles/Sudoku.css';

export const Sudoku = () => {

    const [sudokuState, setSudokuState] = useState(getSudokuInitialState);
    const [isUnderGen, setIsUnderGen] = useState(false);

    
    
    const solveSudoku = () => {

        // setTimeout(() => {
            
        // }, 100);

        let [row, col, emptyCheck] = findEmptyLocation(sudokuState);

        if(!emptyCheck) {
            return true
        }

        for(let i = 1; i < 10; i++){

            if(isSafeCell(sudokuState, row, col, i)){
                let newState = [...sudokuState].map(row => {
                    return row.slice()
                })
                newState[row][col].value = i
                setSudokuState(newState)
    
                if(solveSudoku()){ return true }
    
                newState = [...sudokuState].map(row => {
                    return row.slice()
                })
                newState[row][col].value = 0
                setSudokuState(newState)
            }
        }
        return false
    }

    const handleValue = (event, isIncre, row, col) => {
        event.preventDefault()
        let currentVal = sudokuState[row][col].value
        let nextVal = currentVal
        
        if(isIncre){
            nextVal =  currentVal >= 9 ? 0 : currentVal + 1;
        }else{
            nextVal = currentVal <= 0 ? 9 : currentVal - 1;
        }
        
        let newState = [...sudokuState].map(rowCells => {
            return rowCells.slice()
        })
        
        newState[row][col].value = nextVal
        
        if(nextVal !== 0 && !isSafeCell(sudokuState, row, col, nextVal)){
            newState[row][col].isError = true
        }else{
            newState[row][col].isError = false
        }
        
        setSudokuState(newState)
    }
    
    const solve = () => {

        if(isUnderGen){
            // clearInterval(isUnderGen);
            setIsUnderGen(false);
            console.log(isUnderGen);
        }else{
            setIsUnderGen(true);
            solveSudoku();
        }

    }

    return (
        <div className="sudoku-container">
            <div className="sudoku-wrapper">
                
                {
                    sudokuState.map((row, r) => (
                        <React.Fragment>
                            {
                                row.map((cell, c) => (
                                    <div className={`sudokucell-container ${r%3 === 0 ? "cell-top": ''}  ${c%3===0 ? "cell-left": ''}  ${cell.isError ? 'cell-isError': ''}`} 
                                        onClick={e => handleValue(e, true, r, c)} 
                                        onContextMenu={e => handleValue(e, false, r, c)} 
                                    >
                                        {cell.value === 0 ? '' : cell.value}
                                    </div>
                                ))
                            }
                        </React.Fragment>
                    )) 
                }
                
            </div>
            <div className="sudoku-controls">
                <div className="sudokubtn" onClick={solve}>
                    {
                        isUnderGen ? (
                            <i className="bi bi-pause"></i>
                        ) : (
                            <i className="bi bi-play"></i>
                        )
                    }
                </div>
                <div className="sudokubtn">
                    <i className="bi bi-download"></i>
                </div>
            </div>
        </div>
    );
}