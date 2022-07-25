import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../design/images/logo.png';
let style = require('../design/css/welcomePage.module.css');

export default function WelcomePage()
{
    return (
        <React.Fragment>
            <div className={style.contPrincipal}>
                <div className={style.contPrincipal__contHeader}>
                    <div className={style.contPrincipal__contHeader__contImg}>
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className={style.contPrincipal__contBody}>
                    <button className={style.contPrincipal__contBody__btnStart}>
                        <NavLink to={'/yourCountry/pages'} className={style.link}>Welcome <i></i></NavLink>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}