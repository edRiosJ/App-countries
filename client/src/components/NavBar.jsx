import React from 'react';
import {NavLink} from 'react-router-dom';
import { FcHome, FcNightLandscape } from "react-icons/fc";
let style = require('../design/css/navBar.module.css');

export default function NavBar()
{
    return (
        <React.Fragment>
            <nav className={style.nav}>
                <div className={style.nav_contImg}></div>
                <ul className={style.nav_contBtn}>
                    <li>
                        <NavLink exact to={'/'} className={style.navLink} activeStyle={{color: "#cc8c13"}}><FcHome/>Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact to={'/newActivity'} className={style.navLink} activeStyle={{color: "#cc8c13"}}><FcNightLandscape/>New activity</NavLink>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}