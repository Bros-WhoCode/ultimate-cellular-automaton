import React, {useContext} from 'react';
import { sudokuContext } from '../pages/Home';

import '../styles/Sudoku.css'

export const SudokuCell = ({row, col, isSafe, isError, isUnderGen}) => {

    const [sudokuState, sudokuDispatch] = useContext(sudokuContext);

    const handleValue = (event, isIncre) => {
        event.preventDefault()
        let currentVal = sudokuState[row][col].value
        if(isIncre){
            let nextVal =  currentVal > 9 ? 0 : currentVal + 1;
            console.log("Changing value from ", currentVal, "to ",  nextVal);
           sudokuDispatch({
               type: "CHANGE_VALUE",
               row: row,
               col: col,
               returnVal: nextVal
           })
        }else{
            let nextVal = currentVal < 0 ? 9 : currentVal - 1
           sudokuDispatch({
               type: "CHANGE_VALUE",
               row: row,
               col: col,
               returnVal: nextVal
           })
        }
    }
    return (
        <div className="sudokucell-container" onClick={e => handleValue(e, true)} onContextMenu={e => handleValue(e, false)} >
            {sudokuState[row][col].value === 0 ? '' : sudokuState[row][col].value}
        </div>
    )
}