let cells = []
for(let r = 0; r < 9; r++){
    let row = [];
    for(let c = 0; c < 9; c++){
        // row[c] = new SudokuCellProp(r+1, c+1);
        row[c] = {
            value: 0,
            row: r,
            col: c,
            isSafe: false,
            isError: false
        }
    }
    cells[r] = row;
}
export let sudokuInitialState = cells

export const sudokuReducer = (sudokuState, action) => {
    switch (action.type) {
        case "changeValue":
            let returnVal = 3
            return  sudokuState.map((row,r) => {
                return row.map((cell, c) => {
                    if(r === action.row && c === action.col){
                        cell.value = returnVal
                    }
                    return cell
                })
            })
    
        default:
            break;
    }

}