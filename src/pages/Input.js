import React, { useState } from 'react'
import '../styles/Input.css'
import {RuleComp} from '../components/RuleComp'

const Input = () => {

    const genIdx = () => {
        return Math.random().toString(36).substring(7,10);
    }

    const initialRuleSet = [
        {
            idx: genIdx(),
            array: [
                0,0,0,
                0,1,1,
                0,0,1
            ],
            returnValue: true,
            isValid: true,
        }
    ]

    const [ruleSet, setRuleSet] = useState(initialRuleSet)

    const addRuleSet = () => {
        const newRule = {
            idx: genIdx(),
            array: [
                0,0,0,
                0,0,0,
                0,0,0
            ],
            returnValue: true,
            isValid: true,
        }
        let newRuleSet = [...ruleSet, newRule]
        setRuleSet(newRuleSet)
    }

    const deleteRuleSet = (idx) => {
        const newRuleSet = [...ruleSet].filter(ruleSetProp => ruleSetProp.idx !== idx)
        setRuleSet(newRuleSet)
    }

    const toggleValidRuleSet = (idx) => {
        let newRuleSet = [...ruleSet]
        newRuleSet = newRuleSet.map(ruleSetProp => {
            if(ruleSetProp.idx === idx){
                ruleSetProp.isValid = !ruleSetProp.isValid
            }
            return ruleSetProp
        })
        setRuleSet(newRuleSet)
    }

    const editArray = (idx, array) => {
        let newRuleSet = [...ruleSet]
        newRuleSet = newRuleSet.map(ruleSetProp => {
            if(ruleSetProp.idx === idx){
                ruleSetProp.array = array
            }
            return ruleSetProp
        })
        setRuleSet(newRuleSet)
        console.log(ruleSet)
    }

    return (
        <div className="input-container">
            <h2>Edit Ruleset</h2>
            <div className="input-wrapper">
                {
                    ruleSet.map((ruleSetProp, key) => (
                        <RuleComp 
                            key={key}
                            idx={ruleSetProp.idx} 
                            isValid={ruleSetProp.isValid}
                            returnValue={ruleSetProp.returnValue} 
                            array={ruleSetProp.array}
                            deleteSelf={deleteRuleSet}
                            toggleValidSelf={toggleValidRuleSet}
                            editArray={editArray}
                        />
                    ))
                }
            </div>
            <div className="input-footer">
                <div className="input-add-icon">
                    <i class="bi bi-plus-square-dotted" onClick={() => addRuleSet()}></i>
                </div>
            </div>
        </div>
    )
}

export default Input
