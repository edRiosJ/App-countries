import React from 'react';
import {NavLink} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getCountriesName} from '../redux/actions.js'
let style = require('../design/css/navBar.module.css');

export default function NavBar(props)
{
    const dispatch = useDispatch();

    let [searchName, setSearchName] = React.useState('');

    function handleChange(e)
    {
        e.preventDefault();
        dispatch(getCountriesName(e.target.value.trimStart()));
        setSearchName(e.target.value.trimStart());
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        dispatch(getCountriesName(searchName));
        setSearchName('');
    }

    return (
        <React.Fragment>
            <nav className={style.nav}>
                <div className={style.nav_contImg}></div>
                <ul className={style.nav_contBtn}>
                    <li>
                        <NavLink exact to={'/home'} className={style.navLink}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/yourCountry/pages'} className={style.navLink} activeStyle={{color: "#cc8c13"}}>Countries</NavLink>
                    </li>
                    <li>
                        <NavLink exact to={'/yourCountry/newActivity'} className={style.navLink}activeStyle={{color: "#cc8c13"}}>New activity</NavLink>
                    </li>
                    {
                        props.typeBar === 'principal'?
                        (
                            <div className={style.contSearch}>
                                <input
                                    className={style.contSearch_input}
                                    type='text>'
                                    placeholder="Search country"
                                    name='searchName'
                                    autoComplete="off"
                                    value={searchName}
                                    onChange={(e) => handleChange(e)}/>
                                <button className={style.contSearch_btn} onClick={(e) => handleSubmit(e)}><i></i></button>
                            </div>
                        ): null
                    }
                </ul>
            </nav>
        </React.Fragment>
    )
}