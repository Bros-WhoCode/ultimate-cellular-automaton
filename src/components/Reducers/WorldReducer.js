class State {

    constructor(prevState, rows, cols){

        if(!prevState){

            this.currentState = 0;
            this.rows = rows;
            this.cols = cols;
            this.neighbors = {};

            this.cells = new Array(rows);

            for(let i = 0; i < rows; i++){
                this.cells[i] = new Array(cols);
            }

            for(let i = 0; i < rows; i++){
                this.neighbors[i] = {};
                for(let j = 0; j < cols; j++){
                    this.cells[i][j] = false;

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
            this.cells = prevState.cells;
            this.currentState = prevState.currentState;
            this.neighbors = prevState.neighbors;

        }

    }


    check(i, j){
        return i >= 0 && i < this.rows && j >= 0 && j < this.cols;
    }

    make2DArray() {
        let arr = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            arr[i] = new Array(this.cols);
        }
        return arr;
    }

}



export const BoxBorder = (state) => {

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            state.cells[i][j] = false;
        }
    }

    for(let i = 0; i < state.cols; i++){
        state.cells[0][i] = true;
        state.cells[state.rows-1][i] = true;
    }

    for(let j = 1; j < state.rows-1; j++){
        state.cells[j][0] = true;
        state.cells[j][state.cols-1] = true;
    }


}

export const Random = (state) => {

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            state.cells[i][j] = false;
        }
    }

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            if(Math.random() > 0.7){
                state.cells[i][j] = true;
            }else{
                state.cells[i][j] = false;
            }
        }
    }

}


export const WhiteSpace = (state) => {

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            state.cells[i][j] = false;
        }
    }

}

export const InitialState = ({rows, cols}) => {
    return new State(null, rows, cols);
}

const StateDict = {WhiteSpace, BoxBorder, Random};
let StateNames = [];
for(let k in StateDict) StateNames.push(k);




export const worldReducer = (state, action) => {

    if(action.type === "TOGGLE_ON"){

        state.cells[action.data.i][action.data.j] = true;

    }else if(action.type === "TOGGLE_OFF"){

        state.cells[action.data.i][action.data.j] = false;
        
    }else if(action.type === "CHANGE_STATE"){

        let newIndex = state.currentState + 1;

        if(newIndex >= StateNames.length){
            newIndex = 0;
        }

        state.currentState = newIndex;
        StateDict[StateNames[state.currentState]](state);

    }else if(action.type === "CLEAR"){
        
        for(let i = 0; i < state.rows; i++){
            for(let j = 0; j < state.cols; j++){
                state.cells[i][j] = false;
            }
        }

    }else if(action.type === "SIMULATING"){

        let next = state.make2DArray();

        for(let i = 0; i < state.rows; i++){
            for(let j = 0; j < state.cols; j++){

                let neighs = state.neighbors[i][j];
                let alive_neighs = 0;

                for(let k = 0; k < 9; k++){
                    if(state.cells[neighs[k].x][neighs[k].y]) alive_neighs += 1;
                }

                if(state.cells[i][j]){
                    alive_neighs -= 1;
                }

                if(state.cells[i][j] === false && alive_neighs === 3){
                    next[i][j] = true;
                }else if(state.cells[i][j] === true && (alive_neighs < 2 || alive_neighs > 3)){
                    next[i][j] = false;
                }else{
                    next[i][j] = state.cells[i][j];
                }
            }
        }

        state.cells = next;

    }

    return new State(state, 0, 0);

}

