import React, { useState } from 'react'

import '../styles/Sudoku.css'
import { isSafeRow } from './SudokuUtils'

export const SudokuCell = ({value, row, col, isSafe, isError, isUnderGen, sudokuState, sudokuDispatch}) => {
    const [cellValue, setCellValue] = useState(0)
    const handleValue = (event, isIncre) => {
        event.preventDefault()
        if(isIncre){
            setCellValue(cellValue >= 9? 1: cellValue+1)
        }else{
            setCellValue(cellValue <= 0? 9: cellValue-1)
        }
        let errorType = null
        if(!isSafeRow(sudokuState, row, col, cellValue))
        sudokuDispatch({
            type: "changeValue", 
            rowNo: row,
            colNo: col,
            value: cellValue,
            errorType: errorType
        })
    }
    return (
        <div className="sudokucell-container" onClick={e => handleValue(e, true)} onContextMenu={e => handleValue(e, false)} >
            {cellValue === 0 ? '' : cellValue}
        </div>
    )
}
