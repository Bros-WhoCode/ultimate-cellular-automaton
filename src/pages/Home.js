import React, {createContext, useReducer, useRef} from 'react';

import { reducer as worldReducer, InitialState as InitialWorldState } from '../components/Reducers/WorldReducer';
import { reducer as ruleListReducer, InitialState as InitialRuleListState } from '../components/Reducers/RuleListReducer';
import { sudokuReducer, getSudokuInitialState } from '../components/Reducers/SudokuReducer';

import { RuleList } from '../components/RuleList';
import World from '../components/World';
import { Sudoku } from './Sudoku';

import '../styles/Home.css';
import '../styles/Landing.css'
import Heading from '../assets/head.png'

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

const smoothScrollTo = target => {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop === 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target === scrollContainer) break;
        targetY += target.offsetTop;
    } while (target === target.offsetParent);
    
    let scroll = (c, a, b, i) => {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

export const Home = () => {

    const homeRef = useRef(null);
    const sudokuRef = useRef(null);

    return (
        <div className="home-container">
            <div className="landing-container">
                <div className="landing-nav">
                    <div className="landing-shadow-wrapper">
                        <div className="landing-btn landing-left-btn" onClick={() => smoothScrollTo(homeRef.current)}>
                            Cellular <br/>Automaton
                        </div>
                    </div>
                    <div className="landing-shadow-wrapper">
                        <div className="landing-btn landing-right-btn" onClick={() => smoothScrollTo(sudokuRef.current)}>
                            Sudoku<br/> Solver
                        </div>
                    </div>
                </div>
                <div className="landing-wrapper">
                    <img src={Heading} alt="" />
                </div>
            </div>
            <worldContext.Provider value={useReducer(worldReducer, null, InitialWorldState)}>
                <ruleListContext.Provider value={useReducer(ruleListReducer, null, InitialRuleListState)}>
                    <div className="home-world-grid-wrapper" ref={homeRef}>
                        <World/>
                        <RuleList/>
                    </div>
                </ruleListContext.Provider>
            </worldContext.Provider> 
            <div className="home-sudoku-wrapper" ref={sudokuRef}>
                <Sudoku/>
            </div> 
        </div>

    )
}

// export default Home
