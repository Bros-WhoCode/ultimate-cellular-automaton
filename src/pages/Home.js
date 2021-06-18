import React, {createContext, useState, useReducer} from 'react';
// import {WorldComponent} from '../components/World';

import World from '../components/World';
import { worldReducer, InitialState } from '../components/Reducers/WorldReducer';

import '../styles/Home.css';

export const worldContext = createContext();

export const Home = () => {

    const rows = 30;
    const cols = 60;

    return (
        <worldContext.Provider value={useReducer(worldReducer, {rows : rows, cols : cols}, InitialState)}>
            <div className="home-container">
                <div className="home-wrapper">
                    {/* <World rows={rows} cols={cols}></World> */}
                    <World></World>
                </div>
            </div>
        </worldContext.Provider>
    )
}

// export default Home
