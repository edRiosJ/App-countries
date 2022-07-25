import React from 'react';
import Pagination from '../components/Pagination.jsx';
import CountryCard from '../components/CountryCard.jsx';
import FormPanel from '../components/FormPanel.jsx';
let style = require('../design/css/contentPanel.module.css');

export default function ContentPanel(props)
{
    const myPanel = props.typeContent === 'showPagination'?
    (
        <React.Fragment>
            <div className={style.contPagination}>
                <Pagination/>
            </div>
        </React.Fragment>
    )
    :
    (props.typeContent === 'showCard'?
        (
            <React.Fragment>
                <div className={style.contCardCountry}>
                    <CountryCard/>
                </div>
            </React.Fragment>
        )
        :
        (
            <React.Fragment>
                <div className={style.contForm}>
                    <FormPanel/>
                </div>
            </React.Fragment>
        )
    )

    return myPanel;
}