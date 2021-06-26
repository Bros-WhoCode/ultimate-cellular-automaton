import React, { createContext, useContext } from 'react';
import { ruleListContext } from '../pages/Home';

import Rule from './Rule';

import '../styles/RuleList.css';

export const ruleContext = createContext();

export const RuleList = () => {

    const [ruleList, dispatch] = useContext(ruleListContext);

    const addNewRule = () => {
        dispatch({type : "NEW"});
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
                <div onClick={addNewRule} className="rule-list-add"><i className="bi bi-plus-square"></i></div>
            </div>
        </div>
    );
}
