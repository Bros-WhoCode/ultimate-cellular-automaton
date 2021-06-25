import React, {useContext, useState, useEffect} from 'react';

import { ruleContext } from './RuleList';
import { ruleListContext } from '../pages/Home';

import '../styles/RuleGrid.css';

const GridCell = ({index}) => {

    const rule = useContext(ruleContext);
    const [ruleList, dispatch] = useContext(ruleListContext);
    const [isAlive, setIsAlive] = useState(rule.grid[index]);


    const [styles, setStyles] = useState({
        backgroundColor : 'white',
    });

    const toggleLife = (e) => {
        dispatch({type : "TOGGLE_GRID", data : {id : rule.id, index : index}});
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
        setIsAlive(rule.grid[index]);
    }, [ruleList]);

    return (
        <div onClick={toggleLife} style={styles} className="grid-cell-container"></div>
    );
}


const RuleGrid = () => {

    const rule = useContext(ruleContext);

    return (
        <div className="rule-grid-container">
            <div className="rule-grid-row">
                {rule.grid.slice(0, 3).map((state, index) => <GridCell index={0 + index}></GridCell>)}
            </div>
            <div className="rule-grid-row">
                {rule.grid.slice(3, 6).map((state, index) => <GridCell index={3 + index}></GridCell>)}
            </div>
            <div className="rule-grid-row">
                {rule.grid.slice(6, 9).map((state, index) => <GridCell index={6 + index}></GridCell>)}
            </div>
        </div>
    );
}
 
export default RuleGrid;