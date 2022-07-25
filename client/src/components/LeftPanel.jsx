import React from 'react';
import FilterPanel from '../components/FilterPanel.jsx';
let style = require('../design/css/leftPanel.module.css')

export default function LeftPanel(props)
{
    const myPanel = props.typeLeft === 'principal'?
    (
        <React.Fragment>
            <div>
                <FilterPanel/>
            </div>
        </React.Fragment>
    )
    :
    (
        <React.Fragment>
            <div className={style.contSecondary}></div>
        </React.Fragment>
    )

    return myPanel;
}