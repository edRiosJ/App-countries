import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFilters, getAllCountries, getCountriesOrder} from '../redux/actions.js';
import {getCountriesName} from '../redux/actions.js';
import { FcSearch } from "react-icons/fc";
import { IconContext  } from "react-icons";
let style = require('../design/css/filterPanel.module.css');
require('dotenv').config();

const URL = process.env.REACT_APP_URL === 'production' ? 'https://app--countries.herokuapp.com' : 'http://localhost:3001';

export default function FilterPanel()
{
    const dispatch = useDispatch();

    let [typeFilter, setTypeFilter] = React.useState({typeCont: '', typeAct: '', typeOrd: ''});
    let [listAct, setListAct] = React.useState([]);
    let [searchName, setSearchName] = React.useState('');
    const listCountries = useSelector(state => state.listCountries);

    React.useEffect(() =>
    {
        fetch(`${URL}/activities`)
        .then(res => res.json())
        .then(data => setListAct(data))
        .catch(error => setListAct(error));
    },[]);

    React.useEffect(() =>
    {
        if(typeFilter.typeCont === '' && typeFilter.typeAct === '' && typeFilter.typeOrd === '') return dispatch(getAllCountries());
        else if((typeFilter.typeCont === ''|| typeFilter.typeCont === 'all') && typeFilter.typeAct === '' && typeFilter.typeOrd !== '')
        return dispatch(getCountriesOrder(typeFilter.typeOrd));
        else if(typeFilter.typeCont !== '' && typeFilter.typeAct === '') return dispatch(setFilters(orderList(filterByContinent(listCountries))));
        else if(typeFilter.typeCont === '' && typeFilter.typeAct !== '') return dispatch(setFilters(orderList(filterByActivity(listCountries))));
        else
        {
            let myFilter = orderList(filterByActivity(filterByContinent(listCountries)));
            if(myFilter.length <= 0) myFilter = ({error: 'NOT FOUND'});
            return dispatch(setFilters(myFilter));
        }
    },[dispatch, typeFilter.typeAct, typeFilter.typeCont, typeFilter.typeOrd]);

    function filterByContinent(list)
    {
        let myFilter;
        if(typeFilter.typeCont === 'all') myFilter = list;
        else myFilter = list.filter(el => el.continent === typeFilter.typeCont);
        return myFilter;
    }

    function filterByActivity(list)
    {
        let myFilter;
        if(typeFilter.typeAct === 'none') myFilter = list.filter(el => el.activities.length <= 0);
        else if(typeFilter.typeAct === 'all') myFilter = list.filter(el => el.activities.length > 0);
        else
        {
            myFilter = list.filter(el =>
                {
                    let opt = el.activities.some(nameAct => nameAct.name === typeFilter.typeAct);
                    return opt;
                })
        }
        return myFilter;
    }

    function orderList(list)
    {
        let myOrder = list;
        if(typeFilter.typeOrd !== "")
        {
            if(typeFilter.typeOrd === 'a-z') myOrder = myOrder.sort(sortByName);
            else if(typeFilter.typeOrd === 'z-a') myOrder = myOrder.sort(sortByName).reverse();
            else if(typeFilter.typeOrd === 'ascending') myOrder = myOrder.sort((a, b) => a.population - b.population);
            else myOrder = myOrder.sort((a, b) => b.population - a.population);
        }
        return myOrder;
    }

    function sortByName(x, y)
    {
        return x.name.localeCompare(y.name, 'fr', {ignorePunctuation: true});
    }

    function handleChange(e)
    {
        e.preventDefault();
        setTypeFilter((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    function handleChangeSearch(e)
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
            <div className={style.contPrincipal}>
                <div className={style.contPrincipal__contSelector}>
                    <div className={style.sel}>
                        <span>Continent: </span>
                        <select
                            className={style.selector}
                            name="typeCont"
                            value={typeFilter.typeCont}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Select a option</option>
                            <option value="all">All</option>
                            <option value="Americas">Americas</option>
                            <option value="Europe">Europe</option>
                            <option value="Asia">Asia</option>
                            <option value="Africa">Africa</option>
                            <option value="Oceania">Oceania</option>
                            <option value="Antarctic">Antarctic</option>
                        </select>
                    </div>
                    <div>
                        <span>Activity: </span>
                        <select
                            className={style.selector}
                            name="typeAct"
                            value={typeFilter.typeAct}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Select a option</option>
                            <option value="none">None</option>
                            {
                                listAct.length > 1 ? (<option value='all'>All</option>) : null
                            }
                            {
                                listAct.length > 0 && listAct.map(el =>
                                    {
                                        return (<option value={el.name}>{el.name}</option>)
                                    })
                            }
                        </select>
                    </div>
                </div>

                <div className={style.contPrincipal__contSelector2}>
                    <div>
                    <span>Order by: </span>
                        <select
                            className={style.selector}
                            name="typeOrd"
                            value={typeFilter.typeOrd}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Select a option</option>
                            <optgroup label="Alphabetic">
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                            </optgroup>
                            <optgroup label="Population">
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <div className={style.contSearch}>
                    <div className={`${style.form__group} ${style.field}`}>
                        <input
                            placeholder="Search country"
                            className={style.form__field}
                            type="input"
                            name='searchName'
                            autoComplete="off"
                            value={searchName}
                            onChange={(e) => handleChangeSearch(e)}
                        />
                        <label className={style.form__label}>Search country</label>
                    </div>
                <IconContext.Provider value={{size: "1.8vw" }}>
                    <button className={style.contSearch_btn} onClick={(e) => handleSubmit(e)}><FcSearch/></button>
                </IconContext.Provider>
                </div>
            </div>
        </React.Fragment>
    )
}