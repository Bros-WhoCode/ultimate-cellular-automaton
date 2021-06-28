import React, {createContext, useReducer} from 'react';

import { reducer as worldReducer, InitialState as InitialWorldState } from '../components/Reducers/WorldReducer';
import { reducer as ruleListReducer, InitialState as InitialRuleListState } from '../components/Reducers/RuleListReducer';
import { sudokuReducer, getSudokuInitialState } from '../components/Reducers/SudokuReducer';

import { RuleList } from '../components/RuleList';
import World from '../components/World';
import { Sudoku } from './Sudoku';

import '../styles/Home.css';

export const worldContext = createContext();
export const ruleListContext = createContext();
export const sudokuContext = createContext();

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
        <div className="home-container">
            <worldContext.Provider value={useReducer(worldReducer, null, InitialWorldState)}>
                <ruleListContext.Provider value={useReducer(ruleListReducer, null, InitialRuleListState)}>
                    <div className="home-world-grid-wrapper">
                        <World/>
                        <RuleList/>
                    </div>
                </ruleListContext.Provider>
            </worldContext.Provider>
            <sudokuContext.Provider value={useReducer(sudokuReducer, null, getSudokuInitialState)}>
                <div className="home-sudoku-wrapper">
                    <Sudoku/>
                </div>
            </sudokuContext.Provider>
        </div>

    )
}

// export default Home
