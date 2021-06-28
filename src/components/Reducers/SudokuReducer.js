export const getSudokuInitialState = () => {
    let cells = []
    for(let r = 0; r < 9; r++){
        let row = [];
        for(let c = 0; c < 9; c++){
            // row[c] = new SudokuCellProp(r+1, c+1);
            row.push({
                value: 0,
                row: r,
                col: c,
                isSafe: false,
                isError: false
            });
        }
        cells.push(row);
    }
    return cells
}

export const sudokuReducer = (state, action) => {
    if(action.type === "CHANGE_VALUE"){
        let r = action.row
        let c = action.col
        let newState = [...state].map(row => {
            return row.slice()
        })
        newState[r][c] = action.returnVal
        return newState
    }
}