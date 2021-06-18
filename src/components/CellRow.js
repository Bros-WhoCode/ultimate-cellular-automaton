import React from 'react';

import Cell from './Cell';

import '../styles/CellRow.css';
const CellRow = ({i, row}) => {

    return (
        <div className="cell-row-container">
            {row.map((state, j) => <Cell i={i} j={j} key={j}></Cell>)}
        </div>
    );
}

export default CellRow;