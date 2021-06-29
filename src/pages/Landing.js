import React from 'react'
const Landing = () => {
    return (
        <div className="landing-container">
            <div className="landing-nav">
                <div className="landing-shadow-wrapper">
                    <div className="landing-btn landing-left-btn">Cellular <br/>Automaton</div>
                </div>
                <div className="landing-shadow-wrapper">
                    <div className="landing-btn landing-right-btn">Sudoku<br/> Solver</div>
                </div>
            </div>
            <div className="landing-wrapper">
                <img src={heading} alt="" />
            </div>
        </div>
    )
}

export default Landing
