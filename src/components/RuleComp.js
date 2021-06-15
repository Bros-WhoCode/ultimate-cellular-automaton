import React from 'react'
import '../styles/RuleComp.css'

export const RuleComp = ({idx, isValid, returnValue, array, deleteSelf, toggleValidSelf, editArray}) => {
    return (
        <div className="rulecomp-container">
            <div className="rulecomp-wrapper">
                <RuleGrid array={array} ruleSetIdx={idx} editArray={editArray}/>
                <div className="rulecomp-content">
                    <h6>{`RuleSet #${idx}`}</h6>
                    <div class="form-check rulecomp-checkbox">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" defaultChecked={isValid} onChange={() => toggleValidSelf(idx)}/>
                        <label class="form-check-label" for="flexCheckDefault">
                          Valid
                        </label>
                        <div className="rulecomp-delete-icon" onClick={() => deleteSelf(idx)}>
                            <i class="bi bi-trash-fill"></i>
                        </div>
                    </div>
                    <div className="rulecomp-returns">
                        <select class="form-select form-select-sm" aria-label="Default select example">
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

