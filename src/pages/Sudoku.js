  
import React, { useState, useReducer } from 'react'
import { SudokuCell } from '../components/SudokuCell';
import { sudokuReducer, sudokuInitialState } from '../components/Reducers/SudokuReducer';
import { findEmptyLocation, isSafeCell} from '../components/SudokuUtils';
export const Sudoku = () => {

    
    const [sudokuState, sudokuDispatch] = useReducer(sudokuReducer, sudokuInitialState)
    
    const solveSudoku = () => {
        setTimeout(() => {
            
        }, 100);
        let [row, col, emptyCheck] = findEmptyLocation(sudokuState)
        if(!emptyCheck) {
            return true
        }
        for(let i = 1; i < 10; i++){
            if(isSafeCell(sudokuState, row, col, i)){
                sudokuDispatch({
                    type: "changeValue", 
                    rowNo: row,
                    colNo: col,
                    value: i,
                    errorType: null
                })
                if(isUnderGen && solveSudoku()) return true
                sudokuDispatch({
                    type: "changeValue", 
                    rowNo: row,
                    colNo: col,
                    value: 0,
                    errorType: null
                })
            }
        }
        return false
    }

    const [isUnderGen, setIsUnderGen] = useState(false);
    
    return (
        <div className="sudoku-container">
            <div className="sudoku-wrapper">
                {
                    sudokuState.map((row, r) => (
                        <React.Fragment>
                            {
                                row.map((cell, c) => (
                                    <SudokuCell 
                                        sudokuState={sudokuState}
                                        sudokuDispatch={sudokuDispatch}
                                        key={r*9 + c}
                                        val={cell.value} 
                                        row={cell.row} 
                                        col={cell.col} 
                                        isSafe={cell.isSafe}
                                        isError={cell.isError}
                                        isUnderGen={isUnderGen}
                                    />
                                ))
                            }
                        </React.Fragment>
                    )) 
                }
            </div>
            <div className="sudoku-controls">
                <div className="sudokubtn" onClick={() => {setIsUnderGen(!isUnderGen); solveSudoku()}}>
                    {
                        isUnderGen ? (
                            <i className="bi bi-pause"></i>
                        ):(
                            <i className="bi bi-play"></i>
                        )
                    }
                </div>
                <div className="sudokubtn">
                    <i className="bi bi-download"></i>
                </div>
            </div>
        </div>
    )
}