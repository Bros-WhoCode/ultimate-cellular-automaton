import { Cell } from "./Cell";

const BoxBorder = (rows, cols) => {
    const cells = new Array(rows);
    for(let i = 0; i < rows; i++){
        cells[i] = new Array(cols);
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            cells[i][j] = new Cell(i, j, false, rows, cols);
        }
    }

    for(let i = 0; i < cols; i++){
        cells[0][i].state = true;
        cells[rows-1][i].state = true;
    }

    for(let j = 1; j < rows-1; j++){
        cells[j][0].state = true;
        cells[j][cols-1].state = true;
    }

    return cells;
}


const WhiteSpace = (rows, cols) => {

    const cells = new Array(rows);
    for(let i = 0; i < rows; i++){
        cells[i] = new Array(cols);
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            cells[i][j] = new Cell(i, j, false, rows, cols);
        }
    }

    return cells;
}

export const stateDict = {WhiteSpace, BoxBorder};
export const states = [];
for(let k in stateDict) states.push(k);
