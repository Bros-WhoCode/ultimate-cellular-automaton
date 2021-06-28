export const isSafeCell = (grid, rowNo, colNo, value) => {
    return isSafeRow(grid, rowNo, value) && 
    isSafeCol(grid, rowNo, colNo, value) &&
    isSafeBlock(grid, rowNo, colNo, value);
}

export const isSafeRow = (grid, rowNo, colNo, value) => {
    for(let c = 0; c < 9; c++){
        if(c === colNo) continue;
        if(grid[rowNo][c].value === value){
            return false
        }
    }
    return true
}

export const isSafeCol = (grid, rowNo, colNo, value) => {
    for(let r = 0; r < 9; r++){
        if(rowNo === r) continue;
        if(grid[r][colNo].value === value){
            return false
        }
    }
    return true
}

export const isSafeBlock = (grid, rowNo, colNo, value) => {
    let startRow = rowNo - rowNo%3;
    let startCol = colNo - colNo%3;
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            if(startRow+r === rowNo && startCol+c === colNo) continue;
            if(grid[startRow+r][startCol+c].value === value){
                return false
            }
        }
    }
    return true
}

export const findEmptyLocation = (grid) => {
    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            if(grid[r][c].value === 0){
                return [r, c, true]
            }
        }
    }
    return [null, null, false]
}