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
