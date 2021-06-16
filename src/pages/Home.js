import React from 'react'

import {WorldComponent} from '../components/World';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-wrapper">
                <WorldComponent rows={20} cols={30}></WorldComponent>
            </div>
        </div>
    )
}

export default Home
