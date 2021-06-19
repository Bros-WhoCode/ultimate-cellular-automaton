import React, {createContext, useReducer} from 'react';
import World from '../components/World'; 
import { worldReducer, InitialState } from '../components/Reducers/WorldReducer';
import Input from '../components/Input'
import '../styles/Home.css';

export const worldContext = createContext();

export const Home = () => {

    const rows = 30;
    const cols = 70;

    return (
        <worldContext.Provider value={useReducer(worldReducer, {rows : rows, cols : cols}, InitialState)}>
            <div className="home-container">
                <div className="home-wrapper">
                    <World/>
                    <Input/>
                </div>
            </div>
        </worldContext.Provider>
    )
}

// export default Home
