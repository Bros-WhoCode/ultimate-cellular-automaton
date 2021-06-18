class State {

    constructor(prevState, rows, cols){

        if(!prevState){

            this.currentState = 0;
            this.rows = rows;
            this.cols = cols;
            this.history = [];

            this.cells = new Array(rows);

            for(let i = 0; i < rows; i++){
                this.cells[i] = new Array(cols);
            }

            for(let i = 0; i < rows; i++){
                for(let j = 0; j < cols; j++){
                    this.cells[i][j] = false;
                }
            }

        }else{

            this.rows = prevState.rows;
            this.cols = prevState.cols;
            this.cells = prevState.cells;
            this.history = prevState.history;
            this.currentState = prevState.currentState;

        }

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


export const WhiteSpace = (state) => {

    for(let i = 0; i < state.rows; i++){
        for(let j = 0; j < state.cols; j++){
            state.cells[i][j] = false;
        }
    }

    for(let his of state.history){
        state.cells[his.i][his.j] = true;
    }

}

export const InitialState = ({rows, cols}) => {
    return new State(null, rows, cols);
}

const StateDict = {WhiteSpace, BoxBorder};
let StateNames = [];
for(let k in StateDict) StateNames.push(k);

export const worldReducer = (state, action) => {

    if(action.type == "TOGGLE_ON"){

        state.history.push({i : action.data.i , j : action.data.j});
        state.cells[action.data.i][action.data.j] = true;

    }else if(action.type == "TOGGLE_OFF"){

        let i;
        for(i = 0; i < state.history.length; i++){
            if(state.history[i].i === action.data.i && state.history[i].j === action.data.j){
                break;
            }
        }

        if(i != state.history.length) state.history.splice(i, 1);

        state.cells[action.data.i][action.data.j] = false;
        
    }else if(action.type == "CHANGE_STATE"){

        let newIndex = state.currentState + 1;

        if(newIndex >= StateNames.length){
            newIndex = 0;
        }

        state.currentState = newIndex;
        StateDict[StateNames[state.currentState]](state);

    }

    return new State(state, 0, 0);

}

