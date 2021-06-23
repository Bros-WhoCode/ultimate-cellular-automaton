import { useContext } from 'react';
import { ruleListContext } from '../pages/Home';

import Rule from './Rule';

import '../styles/RuleList.css';

const RuleList = () => {

    const [ruleList, dispatch] = useContext(ruleListContext);


    return (
        <div className="rule-list-container">
            {ruleList.rules.map((RuleItem) => <Rule rule={RuleItem}></Rule>)}
        </div>
    );
}
 
export default RuleList;