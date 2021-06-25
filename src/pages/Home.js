import React, {createContext, useEffect, useReducer, useState} from 'react';
import World from '../components/World'; 
import { reducer as worldReducer, InitialState as InitialWorldState } from '../components/Reducers/WorldReducer';
import { reducer as ruleListReducer, InitialState as InitialRuleListState } from '../components/Reducers/RuleListReducer';
import { RuleList } from '../components/RuleList';


import '../styles/Home.css';

export const worldContext = createContext();
export const ruleListContext = createContext();

export const convertVwToPx = (vw=80) => {
    const oneVhInPx = window.innerWidth / 100;
    return oneVhInPx * vw;
};

export const convertVhToPx = (vh=80) => {
    const oneVhInPx = window.innerHeight / 100;
    return oneVhInPx * vh;
};


export const Home = () => {

    // const initialRows = 10;
    // const initialCols = 10;

    return (
        <worldContext.Provider value={useReducer(worldReducer, null, InitialWorldState)}>
            <ruleListContext.Provider value={useReducer(ruleListReducer, null, InitialRuleListState)}>
                <div className="home-container">
                    <div className="home-wrapper">
                        <World/>
                        <RuleList/>
                    </div>
                </div>
            </ruleListContext.Provider>
        </worldContext.Provider>
    )
}

// export default Home
