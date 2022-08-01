import React from 'react';
// import video from '../design/images/countries.webm';
import style from '../design/css/mediaPanel.module.css';

export default function MediaPanel()
{
    return (
        <React.Fragment>
            <div className={style.containerMedia}>
                {/* <div className={style.containerImg}></div> */}
                {/* <video autoplay="true" loop src={video} preload="auto"/> */}
            </div>
        </React.Fragment>
    )
}