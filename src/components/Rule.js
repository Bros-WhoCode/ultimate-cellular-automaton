import React, { useContext, useEffect, useState } from 'react';

import RuleGrid from './RuleGrid';
import { ruleContext } from './RuleList';

import '../styles/Rule.css';
import { ruleListContext } from '../pages/Home';

const OutputCell = () => {

    const rule = useContext(ruleContext);
    const [ruleList, dispatch] = useContext(ruleListContext);

    const [isAlive, setIsAlive] = useState(rule.result);

    const [styles, setStyles] = useState({
        backgroundColor : 'white',
    });

    const toggleLife = (e) => {
        dispatch({type : "TOGGLE_RESULT", data : {id : rule.id}});
    }

    useEffect(() => {

        if(isAlive){
            setStyles({
                backgroundColor : 'black',
            })
        }else{
            setStyles({
                backgroundColor : 'white',
            })
        }

    }, [isAlive]);

    useEffect(() => {
        setIsAlive(rule.result);
    }, [ruleList, rule]);

    return (
        <div onClick={toggleLife} style={styles} className="output-cell-container"></div>
    );

}

const RelationCell = ({index, operation}) => {

    const rule = useContext(ruleContext);
    const [ruleList, dispatch] = useContext(ruleListContext);

    const [isOn, setIsOn] = useState(rule.relations[index]);

    const [styles, setStyles] = useState({
        color : 'black'
    });

    const toggleRelation = (e) => {
        dispatch({type : "TOGGLE_RELATION", data : {id : rule.id, index : index}});
    }

    useEffect(() => {

        if(isOn){
            setStyles({
                color : 'blue'
            });
        }else{
            setStyles({
                color : 'black'
            });
        }

    }, [isOn]);

    useEffect(() => {
        setIsOn(rule.relations[index]);
    }, [ruleList, rule, index]);

    return (
        <div style={styles} onClick={toggleRelation} className="rule-input">{operation}</div>
    );
}



const Rule = () => {

    const rule = useContext(ruleContext);
    const [ruleList, dispatch] = useContext(ruleListContext);

    const [outerOverlayStyles, setOuterOverlayStyles] = useState({
        display : 'none',
    });

    const [innerOverlayStyles, setInnerOverlayStyles] = useState({
        display : 'none',
    });

    const toggleValid = () => {
        dispatch({type : "TOGGLE_VALID", data : {id : rule.id}});
    }

    const toggleOnlyCount = () => {
        dispatch({type : "TOGGLE_ONLY_COUNT", data : {id : rule.id}});
    }

    const removeRule = () => {
        dispatch({type : "REMOVE", data : {id : rule.id}});
    }

    useEffect(() => {

        if(!rule.valid){
            setOuterOverlayStyles({
                display : 'block',
            })
        }else{
            setOuterOverlayStyles({
                display : 'none',
            })
        }

        if(!rule.onlyCount){
            setInnerOverlayStyles({
                display : 'block',
            })
        }else{
            setInnerOverlayStyles({
                display : 'none',
            })
        }

    }, [ruleList, rule]);

    return (
        <div className="rule-container">
            <div className="rule-title">
                <div className="rule-id">
                    #{rule.id.substring(1, 5)}
                </div>
                <div className="rule-visibility">
                    <input onClick={toggleValid} type="checkbox" defaultChecked={rule.valid}/>
                </div>
                <div onClick={removeRule} className="rule-delete">
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="rule-body">
                <div style={outerOverlayStyles} className="rule-overlay"></div>
                <div className="rule-body-wrapper">
                    <div className="rule-rule">
                        <div className="rule-grid">
                            <RuleGrid></RuleGrid>
                        </div>
                        <div className="rule-spacer">
                            <i className="bi bi-arrow-right"></i>
                        </div>
                        <div className="rule-output">
                            <OutputCell></OutputCell>
                        </div>
                    </div>
                    <div className="rule-controls">
                        <div className="rule-only-count">
                            <input onClick={toggleOnlyCount} type="checkbox" defaultChecked={rule.onlyCount}/>
                        </div>
                        <div className="rule-relations">
                            <div style={innerOverlayStyles} className="rule-relations-overlay"></div>
                            <div className="rule-relations-wrapper">
                                {rule.relationOperations.map((operation, index) => <RelationCell key={index} index={index} operation={operation}></RelationCell>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Rule;