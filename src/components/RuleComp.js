import React from 'react'
import '../styles/RuleComp.css'

export const RuleComp = ({idx, isValid, returnValue, isCount, relation, relationalOperations, array, deleteSelf, toggleValidSelf, editArray, setReturnValue}) => {
    return (
        <div className="rulecomp-container">
            <div className="rulecomp-wrapper">
                <RuleGrid array={array} ruleSetIdx={idx} editArray={editArray}/>
                <div className="rulecomp-content">
                    <h6>{`RuleSet #${idx}`}</h6>
                    <div className="form-check rulecomp-checkbox">
                        <div className="rulecomp-checkbox-wrapper">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" defaultChecked={isValid} onChange={() => toggleValidSelf(idx)}/>
                            <label className="form-check-label" for="flexCheckDefault">
                                Valid
                            </label>
                            <input className="form-check-input" type="checkbox" value="" id="flexCountDefault" defaultChecked={isCount}/>
                            <label className="form-check-label" for="flexCountDefault">
                                Count
                            </label>
                        </div>
                        <div className="rulecomp-delete-icon" onClick={() => deleteSelf(idx)}>
                            <i className="bi bi-trash-fill"></i>
                        </div>
                    </div>
                    <div className="rulecomp-returns">
                        <select className="form-select form-select-sm" aria-label="Default select example" onChange={(value) => setReturnValue(idx, value)}>
                          <option value="0">0</option>
                          <option selected value="1">1</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const RuleGrid = ({array, editArray, ruleSetIdx}) => {

    const toggleValue = (array, gridIdx) => {
        let newArray = [...array].map((el, i) => {
            if(i === gridIdx){
                el = el === 0 ? 1 : 0
            }
            return el
        })
        editArray(ruleSetIdx, newArray)
    }

    return (
        <div className="rulegrid-container">
            <div className="rulegrid-wrapper">
                {
                    array.map((val, i, arr) => <RuleCell val={val} idx={i} key={i} array={arr} toggleValue={toggleValue} />)
                }
            </div>
        </div>
    )
}

export const RuleCell = ({val, idx, array, toggleValue}) => {
    return (
        <div className={`rulecell ${val===1 ? 'true': 'false'}`} onClick={() => toggleValue(array, idx)}/>
    )
}

