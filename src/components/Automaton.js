const make2DArray = (rows, cols)=> {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

const validateRule = (worldState, rule, i, j) => {

    let neighbors = worldState.neighbors[i][j];
    let conditionSatisfied = false;

    if(rule.onlyCount){

        if(worldState.cells[i][j] === rule.grid[4]){

            let neighs_alive = 0;
            let to_be_alive = 0;

            for(let i = 0; i < 9; i++){
                if(rule.grid[i]) to_be_alive += 1;
            }
            to_be_alive -= rule.grid[4];


            for(let neighs of neighbors){
                if(worldState.cells[neighs.x][neighs.y]) neighs_alive += 1;
            }
            neighs_alive -= worldState.cells[i][j];

            conditionSatisfied = false;

            for(let i = 0; i < rule.relationOperations.length; i++){

                if(rule.relationOperations[i] === '>'){
                    if(rule.relations[i]){
                        if(neighs_alive > to_be_alive) {
                            conditionSatisfied = true; 
                            break;
                        }
                    }
                }

                if(rule.relationOperations[i] === '<'){
                    if(rule.relations[i]){
                        if(neighs_alive < to_be_alive){
                            conditionSatisfied = true;
                            break;
                        }
                    }
                }

                if(rule.relationOperations[i] === '='){
                    if(rule.relations[i]){
                        if(neighs_alive === to_be_alive){
                            conditionSatisfied = true; 
                            break;
                        }
                    }
                }
            }

        }

    }else{

        conditionSatisfied = true;
        for(let i = 0; i < 9; i++){
            let neighs = neighbors[i];
            if(worldState.cells[neighs.x][neighs.y] !== rule.grid[i]) conditionSatisfied=false; break;
        }

    }

    return conditionSatisfied;

}


export const Cellular = (worldState, ruleList) => {

    let next = make2DArray(worldState.rows, worldState.cols);

    for(let i = 0; i < worldState.rows; i++){
        for(let j = 0; j < worldState.cols; j++){

            for(let rule of ruleList.rules){
                if(rule.valid){
                    if(validateRule(worldState, rule, i, j)){
                        next[i][j] = rule.result;
                        break;
                    }else{
                        next[i][j] = 0;
                    }
                }
            }

        }
    }

    return next;

}