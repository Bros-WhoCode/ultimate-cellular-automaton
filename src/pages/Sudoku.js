  
import React from 'react'
import { useContext } from 'react/cjs/react.production.min';
import { getSudokuInitialState, SudokuContext } from '../components/Reducers/SudokuReducer';
import { SudokuCell } from '../components/SudokuCell';
import { findEmptyLocation, isSafeCell} from '../components/SudokuUtils';

export const Sudoku = () => {

    const [sudokuState, ] = useContext(SudokuContext)
    // let sudokuState = getSudokuInitialState()

    const solveSudoku = () => {
        setTimeout(() => {
            
        }, 100);
        let [row, col, emptyCheck] = findEmptyLocation(sudokuState)
        console.log(row, col);
        if(!emptyCheck) {
            return true
        }
        for(let i = 1; i < 10; i++){
            if(isSafeCell(sudokuState, row, col, i)){
            }
        }
        return false
    }

    const generateSolution = () => {

    }
    
    return (
        <div className="sudoku-container">
            <div className="sudoku-wrapper">
                
                {
                    sudokuState.map((row, r) => (
                        <React.Fragment>
                            {
                                row.map((cell, c) => (
                                    <SudokuCell 
                                        key={r*9 + c} 
                                        row={cell.row} 
                                        col={cell.col} 
                                        isSafe={cell.isSafe}
                                        isError={cell.isError}
                                    />
                                ))
                            }
                        </React.Fragment>
                    )) 
                }
                
            </div>
            <div className="sudoku-controls">
                <div className="sudokubtn" onClick={() => generateSolution()}>
                    {
                        // <i className="bi bi-pause"></i>
                        <i className="bi bi-play"></i>
                    }
                </div>
                <div className="sudokubtn">
                    <i className="bi bi-download"></i>
                </div>
            </div>
        </div>
    )
}