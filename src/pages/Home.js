import React, {createContext, useReducer} from 'react';
import World from '../components/World'; 
import { worldReducer, InitialState } from '../components/Reducers/WorldReducer';
import Input, {initialRuleSet} from '../components/Input'
import '../styles/Home.css';
import { useState } from 'react/cjs/react.development';

export const worldContext = createContext();
export const ruleSetContext = createContext();

export const Home = () => {

    const rows = 30;
    const cols = 70;

    return (
        <ruleSetContext.Provider value={useState(initialRuleSet)}>
            <worldContext.Provider value={useReducer(worldReducer, {rows : rows, cols : cols}, InitialState)}>
                <div className="home-container">
                    <div className="home-wrapper">
                        <World/>
                        <Input/>
                    </div>
                </div>
            </worldContext.Provider>
        </ruleSetContext.Provider>
    )
}

// export default Home
