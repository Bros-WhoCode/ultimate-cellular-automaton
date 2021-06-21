import React, { useContext } from 'react';
import { ruleSetContext } from '../pages/Home';
import '../styles/Input.css'
import {RuleComp} from './RuleComp'

const genIdx = () => {
        return Math.random().toString(36).substring(7,10);
}

export const initialRuleSet = [
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

const Input = () => {

    const [ruleSet, setRuleSet] = useContext(ruleSetContext)

    const addRuleSet = () => {
        const newRule = {
            idx: genIdx(),
            array: [
                0,0,0,
                0,0,0,
                0,0,0
            ],
            returnValue: false,
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

    const setReturnValue = (idx, value) => {
        let newRuleSet = [...ruleSet]
        newRuleSet = newRuleSet.map(ruleSetProp => {
            if(ruleSetProp.idx === idx){
                ruleSetProp.returnValue = value === 0 ? false : true
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
                            setReturnValue={setReturnValue}
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
