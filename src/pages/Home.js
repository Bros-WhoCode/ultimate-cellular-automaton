import React, {useState} from 'react'
import { useParams } from 'react-router-dom';

import {WorldComponent} from '../components/World';

import '../styles/Home.css';

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
