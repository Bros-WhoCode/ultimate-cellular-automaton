import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { v4 } from 'uuid';

class Rule {

    constructor(
        id,
        grid = [0, 0, 0, 0, 0, 0, 0, 0, 0],
        onlyCount = false,
        valid = true,
        result = 0,
        relations = [0, 0, 0],
        ){

        this.id = id
        this.grid = grid
        
        this.onlyCount = onlyCount;
        this.valid = valid;
        this.result = result;
        this.relations = relations;
        this.relationOperations = ['>', '<', '='];

    }

}

class RuleList {

    constructor(prevRuleList){

        if(prevRuleList){
            this.rules = prevRuleList.rules
            this.currentState = prevRuleList.currentState;
        }else{
            this.rules = [];
            this.currentState = 0;
        }

    }

    newDefaultRule(){
        return new Rule(this.generateId());
    }

    generateId(){
        return v4();
    }

    getRuleById(id){
        for(let i = 0; i < this.rules.length; i++){
            if(this.rules[i].id === id){
                return i;
            }
        }

        return -1;
    }

}

const Custom = (state) => {
    // state.rules
    state.rules = [state.newDefaultRule()];
}

const GameOfLife = (state) => {

    state.rules = [];
    state.rules.push(new Rule(state.generateId(), [1, 0, 0, 0, 1, 0, 1, 0, 0], true, true, 1, [0, 0, 1]));
    state.rules.push(new Rule(state.generateId(), [1, 0, 1, 0, 1, 0, 1, 0, 0], true, true, 1, [0, 0, 1]));
    state.rules.push(new Rule(state.generateId(), [1, 0, 1, 0, 0, 0, 1, 0, 0], true, true, 1, [0, 0, 1]));

}

const StateDict = {Custom, GameOfLife};
export let StateNames = [];
for(let k in StateDict) StateNames.push(k);

export const InitialState = () => {
    let rl = new RuleList(null);
    Custom(rl);
    return rl;
}

export const reducer = (state, action) => {

    if(action.type === "TOGGLE_GRID"){

        let rule = state.rules[state.getRuleById(action.data.id)];
        if(rule.grid[action.data.index]){
            rule.grid[action.data.index] = 0;
        }else{
            rule.grid[action.data.index] = 1;
        }

    }else if(action.type === "TOGGLE_RESULT"){

        let rule = state.rules[state.getRuleById(action.data.id)];
        if(rule.result){
            rule.result = 0;
        }else{
            rule.result = 1;
        }

    }else if(action.type === "TOGGLE_VALID"){

        state.rules[state.getRuleById(action.data.id)].valid = !state.rules[state.getRuleById(action.data.id)].valid;

    }else if(action.type === "TOGGLE_ONLY_COUNT"){
        
        state.rules[state.getRuleById(action.data.id)].onlyCount = !state.rules[state.getRuleById(action.data.id)].onlyCount;

    }else if(action.type === "TOGGLE_RELATION"){

        let rule = state.rules[state.getRuleById(action.data.id)];
        if(rule.relations[action.data.index]){
            rule.relations[action.data.index] = 0;
        }else{
            rule.relations[action.data.index] = 1;
        }


        if(action.data.index === 0){
            rule.relations[1] = 0;
        }else if(action.data.index === 1){
            rule.relations[0] = 0;
        }

    }else if (action.type === "REMOVE"){

        state.rules.splice(state.getRuleById(action.data.id), 1);

    }else if(action.type === "NEW"){

        state.rules.push(state.newDefaultRule());

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
    }

    return new RuleList(state);
}