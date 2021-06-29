import React, { createContext, useContext } from 'react';

import { StateNames } from './Reducers/RuleListReducer';
import { ruleListContext } from '../pages/Home';
import Flipper from './Flipper';

import Rule from './Rule';

import '../styles/RuleList.css';

export const ruleContext = createContext();

export const RuleList = () => {

    const [ruleList, dispatch] = useContext(ruleListContext);

    const addNewRule = () => {

        if(ruleList.currentState === 0){
            dispatch({type : "NEW"});
        }

    }

    const stateChange = (left) => {
        dispatch({type : "CHANGE_STATE", data : left});
    }

    return (
        <div className="rule-list-container">
            <div className="rule-list-body">
                {ruleList.rules.map((RuleItem, index) => (
                    <ruleContext.Provider key={index} value={RuleItem}>
                        <Rule></Rule>
                    </ruleContext.Provider>
                )
                )}
            </div>
            <div className="rule-list-controls">
                <div onClick={addNewRule} className={`rule-list-add ${(ruleList.currentState !== 0) ? "rule-disabled-button"  : "" }`}><i className="bi bi-plus-square"></i></div>
                <Flipper state={StateNames[ruleList.currentState]} callback={stateChange}></Flipper>
            </div>
        </div>
    );
}
