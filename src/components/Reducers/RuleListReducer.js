import { v4 } from 'uuid';

class Rule {

    constructor(id){

        this.id = id
        this.grid = [0, 0, 1,
                     0, 1, 1,
                     0, 0, 0]
        
        this.onlyCount = true;
        this.valid = true;
        this.result = 0;
        this.relations = [0, 0, 1];
        this.relationOperations = ['>', '<', '='];

    }

}

class RuleList {

    constructor(prevRuleList){

        console.log(this);
        console.log(prevRuleList);

        if(prevRuleList){
            this.rules = prevRuleList.rules
        }else{
            this.rules = [this.newDefaultRule()];
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

export const InitialState = () => {
    return new RuleList(null);
}

export const reducer = (state, action) => {

    if(action.type === "TOGGLE_GRID"){

        state.rules[state.getRuleById(action.data.id)].grid[action.data.index] = !state.rules[state.getRuleById(action.data.id)].grid[action.data.index];

    }else if(action.type === "TOGGLE_RESULT"){

        state.rules[state.getRuleById(action.data.id)].result = !state.rules[state.getRuleById(action.data.id)].result;

    }else if(action.type === "TOGGLE_VALID"){

        state.rules[state.getRuleById(action.data.id)].valid = !state.rules[state.getRuleById(action.data.id)].valid;

    }else if(action.type === "TOGGLE_ONLY_COUNT"){
        
        state.rules[state.getRuleById(action.data.id)].onlyCount = !state.rules[state.getRuleById(action.data.id)].onlyCount;

    }else if(action.type === "TOGGLE_RELATION"){

        let rule = state.rules[state.getRuleById(action.data.id)];
        rule.relations[action.data.index] = !rule.relations[action.data.index];

        if(action.data.index === 0){
            rule.relations[1] = 0;
        }else if(action.data.index === 1){
            rule.relations[0] = 0;
        }

    }else if (action.type === "REMOVE"){

        state.rules.splice(state.getRuleById(action.data.id), 1);

    }else if(action.type === "NEW"){

        state.rules.push(state.newDefaultRule());

    }

    return new RuleList(state);
}