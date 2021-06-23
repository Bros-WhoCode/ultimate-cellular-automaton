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

    }

}

class RuleList {

    constructor(prevRuleList){

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

}

export const InitialState = () => {
    return new RuleList(null);
}

export const reducer = (state, action) => {

    return new RuleList(state);
}