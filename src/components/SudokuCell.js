import React, {useContext} from 'react'
import '../styles/Sudoku.css'
import { SudokuContext } from './Reducers/SudokuReducer';

export const SudokuCell = ({row, col, isSafe, isError, isUnderGen}) => {
    // const [cellValue, setCellValue] = useState(0)
    const [sudokuState, sudokuDispatch] = useContext(SudokuContext);
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