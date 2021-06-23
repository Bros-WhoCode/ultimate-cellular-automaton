import { convertVhToPx, convertVwToPx } from '../../pages/Home';

class State {

    constructor(prevState){

        if(!prevState){

            this.cellSize = 20;
            this.cellSizeChange = 2;

            let cols = Math.floor((convertVwToPx(80) - this.cellSize) / this.cellSize);
            let rows = Math.floor((convertVhToPx(80) - this.cellSize) / this.cellSize);

            this.rows = rows;
            this.cols = cols;
            
            this.maxRows = rows;
            this.maxCols = cols;

            this.minRows = 10;
            this.minCols = 10;

            this.prevMaxRows = [this.minRows];
            this.prevMaxCols = [this.minCols];

            this.currentState = 0;
            

            this.neighbors = {};

            this.cells = new Array(rows);

            for(let i = 0; i < rows; i++){
                this.cells[i] = new Array(cols);
            }

            for(let i = 0; i < rows; i++){
                this.neighbors[i] = {};
                for(let j = 0; j < cols; j++){
                    this.cells[i][j] = 0;

                    this.neighbors[i][j] = [];
                    for (let k = -1; k < 2; k++) {
                        for (let l = -1; l < 2; l++) {
                            let row = (k + i + rows) % rows;
                            let col = (l + j + cols) % cols;
                            this.neighbors[i][j].push({x : row, y : col});
                        }
                    }
                }
            }

        }else{

            this.rows = prevState.rows;
            this.cols = prevState.cols;

            this.maxRows = prevState.maxRows;
            this.maxCols = prevState.maxCols;

            this.minRows = prevState.minRows;
            this.minCols = prevState.minCols;

            this.cellSize = prevState.cellSize;
            this.cellSizeChange = prevState.cellSizeChange;

            this.prevMaxRows = prevState.prevMaxRows;
            this.prevMaxCols = prevState.prevMaxCols;

            this.cells = prevState.cells;
            this.currentState = prevState.currentState;
            this.neighbors = prevState.neighbors;

        }

    }

    recalculate({increase, rows, cols}){

        console.log(this);

        if(increase){

            if(rows > this.maxRows || cols > this.maxCols){

                this.prevMaxRows.push(this.maxRows);
                this.prevMaxCols.push(this.maxCols);

                this.cellSize -= this.cellSizeChange;

                let m_cols = Math.floor((convertVwToPx(80) - this.cellSize) / this.cellSize);
                let m_rows = Math.floor((convertVhToPx(80) - this.cellSize) / this.cellSize);

                this.maxRows = m_rows;
                this.maxCols = m_cols;

            }
        
        }else{

            if(rows < this.prevMaxRows[this.prevMaxRows.length - 1] || cols < this.prevMaxCols[this.prevMaxCols.length - 1]){

                this.prevMaxRows.pop();
                this.prevMaxCols.pop();

                this.cellSize += this.cellSizeChange;

                let m_cols = Math.floor((convertVwToPx(80) - this.cellSize) / this.cellSize);
                let m_rows = Math.floor((convertVhToPx(80) - this.cellSize) / this.cellSize);

                this.maxRows = m_rows;
                this.maxCols = m_cols;

            }

        }

        this.rows = rows;
        this.cols = cols;

        this.cells = new Array(this.rows);

        for(let i = 0; i < this.rows; i++){
            this.cells[i] = new Array(this.cols);
        }

        StateDict[StateNames[this.currentState]](this);

    }

    check(i, j){
        return i >= 0 && i < this.rows && j >= 0 && j < this.cols;
    }

}



export const BoxBorder = (state) => {

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            state.cells[i][j] = 0;
        }
    }

    for(let i = 0; i < state.cols; i++){
        state.cells[0][i] = 1;
        state.cells[state.rows-1][i] = 1;
    }

    for(let j = 1; j < state.rows-1; j++){
        state.cells[j][0] = 1;
        state.cells[j][state.cols-1] = 1;
    }


}

export const Random = (state) => {

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            state.cells[i][j] = 0;
        }
    }

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            if(Math.random() > 0.9){
                state.cells[i][j] = 1;
            }else{
                state.cells[i][j] = 0;
            }
        }
    }

}

export const WhiteSpace = (state) => {

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            state.cells[i][j] = 0;
        }
    }

}

export const InitialState = () => {
    return new State(null);
}

const StateDict = {WhiteSpace, BoxBorder, Random};
export let StateNames = [];
for(let k in StateDict) StateNames.push(k);


export const reducer = (state, action) => {

    if(action.type === "CHANGE_DIM"){

        console.log("Changing dimensions");

        // state.recalculate(action.data.increase, action.data.rows, action.data.cols);
        state.recalculate(action.data);

        // if(rows > state.maxRows){
        //     rows = state.maxRows;
        // }

        // if(rows < state.minRows){
        //     rows = state.minRows;
        // }

        // if(cols > state.maxCols){
        //     cols = state.maxCols;
        // }

        // if(cols < state.minCols){
        //     cols = state.minCols;
        // }

        // state.rows = rows;
        // state.cols = cols;

        // state.cells = make2DArray(rows, cols);
        // StateDict[StateNames[state.currentState]](state);

    }else if(action.type === "TOGGLE_ON"){

        state.cells[action.data.i][action.data.j] = 1;

    }else if(action.type === "TOGGLE_OFF"){

        state.cells[action.data.i][action.data.j] = 0;
        
    }else if(action.type === "CHANGE_STATE"){

        let newIndex = 0;

        if(action.data){

            newIndex = state.currentState - 1;

            if(newIndex < 0){
                newIndex = StateNames.length - 1;
            }

        }else{

            newIndex = state.currentState + 1;

            if(newIndex >= StateNames.length){
                newIndex = 0;
            }

        }

        state.currentState = newIndex;
        StateDict[StateNames[state.currentState]](state);

    }else if(action.type === "CLEAR"){
        
        for(let i = 0; i < state.rows; i++){
            for(let j = 0; j < state.cols; j++){
                state.cells[i][j] = false;
            }
        }
    
    }else if(action.type === "SET_MAX_DIM"){

        return new State(null, action.data.rows, action.data.cols);

    }else if(action.type === "SIMULATING"){

        console.log("SIM....");

        // let next = make2DArray(state.rows, state.cols);
        // let ruleSet = action.value;

        // for(let i = 0; i < state.rows; i++){
        //     for(let j = 0; j < state.cols; j++){

        //         for( let ruleSetProp of ruleSet) {
        //             next[i][j] = validateRuleSet(state, ruleSetProp, i, j);
        //         }

        //     }
        // }

        // state.cells = next;

    }

    return new State(state, 0, 0);

}

const make2DArray = (rows, cols)=> {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

const validateRuleSet = (state, ruleSetProp, i, j) => {

    let neighs = state.neighbors[i][j];
    for(let i = 0; i < 9; i++){
        let neigh_state = state.cells[neighs[i].x][neighs[i].y];
        if(neigh_state !== ruleSetProp.array[i]){
            return false;
        }
    }

    return true;

}
