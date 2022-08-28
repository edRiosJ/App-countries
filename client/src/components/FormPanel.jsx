import React from 'react';
import { SiAddthis } from "react-icons/si";
import { MdDeleteForever } from "react-icons/md";
import { IconContext  } from "react-icons";
import Swal from 'sweetalert2';
let style = require('../design/css/formPanel.module.css');
require('dotenv').config();

const URL = process.env.REACT_APP_URL === 'production' ? 'https://app--countries.herokuapp.com' : 'http://localhost:3001';

export default function FormPanel()
{
    let [activity, setActivity] = React.useState(
                {
                    name: null,
                    difficult: 3,
                    duration: null,
                    season: 'summer',
                    countries: ''
                });

    let [errors, setErrors] = React.useState({});
    let [countries, setCountries] = React.useState([]);
    let [addCountries, setAddCountries] = React.useState([]);

    React.useEffect(() =>
    {
        fetch(`${URL}/countries/`)
        .then(resp => resp.json())
        .then(data =>
            {
                let myMap = data.map(el => {return {id: el.id, name: el.name}})
                myMap = myMap.sort(SortArray)
                setCountries(myMap);
            });
    },[]);

    function SortArray(x, y)
    {
        return x.name.localeCompare(y.name, 'fr', {ignorePunctuation: true});
    }

    function handleChange(e)
    {
        e.preventDefault();
        setActivity((prev) => ({...prev, [e.target.name]: e.target.value}));
        setErrors(validate({...activity, [e.target.name]: e.target.value}));
    }

    function handleChangeName(e)
    {
        e.preventDefault();
        setActivity((prev) => ({...prev, name: e.target.value.trimStart().toLowerCase()}));
        setErrors(validate({...activity, name: e.target.value.trimStart().toLowerCase()}));
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if(Object.keys(errors).length === 0)
        {
            fetch(`${URL}/activities`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify(
                        {
                            name: activity.name,
                            difficult: activity.difficult,
                            duration: activity.duration,
                            season: activity.season,
                            country: addCountries
                        })
                  })
            .then(res => res.json())
            .then(res =>
                {
                    if(res.hasOwnProperty('msg'))
                        Swal.fire(
                        {
                            icon: 'success',
                            title: 'Your activity has been created',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    else
                        Swal.fire(
                        {
                            icon: 'error',
                            title:  `${res.error}`,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    setActivity({name: '', difficult: 3, duration: '', season: 'summer', countries: ''});
                    setAddCountries([]);
                })
            .catch(e => console.log(e));
        }
    }

    function validate()
     {
        let errors = {};
        const regexName = /^[a-zA-\s]+(?: [a-zA-\s]+)*$/i;
        if(activity.name === null) errors.name = 'Insert the name';
        if(!regexName.test(activity.name)) errors.name = 'The name must has only letters';
        if( activity.name !== null && (activity.name.length < 3 || activity.name.length > 20)) errors.name = "The name's size isn't valid";

        if(![1,2,3,4,5].includes(parseInt(activity.difficult))) errors.difficult = "The difficult isn't valid"

        let hours = Math.trunc(Number(activity.duration));
        let minutes = hours === 0 ? Number(activity.duration) * 100 : (Number(activity.duration) % hours) * 100;

        if((hours > 8) || (minutes === 0 && hours <= 0)) errors.duration = "The amount of hours is not valid";

        if(minutes < 0 || minutes > 59) errors.duration = "The amount of minutes is not valid";

        if(!['summer','spring','autumn','winter'].includes(activity.season)) errors.season = "The season isn't valid";

        if(addCountries.length < 1) errors.countries = "Select a country";

        return errors;
     }

     function addCountry(e)
    {
        e.preventDefault();

        if (activity.countries === "") setErrors({...errors, countries: 'Select a country as'});
        else
        {
            if(addCountries.includes(activity.countries))
            {
                setErrors({...errors, countries: 'You are already selected this country'});
                setActivity({...activity, countries: ''});
            }
            else
            {
                setAddCountries([...addCountries, activity.countries]);
                setActivity({...activity, countries: ''});
            }
        }
        setErrors(validate({...activity}));
    }

    function deleteCountry(id)
    {
        let newList = addCountries.filter(country => country !== id);
        setAddCountries(newList);
        setErrors(validate({...activity}));
    }

    return (
        <React.Fragment>
            <div className={style.formContainer}>
                <div className={style.panelLeftForm}>
                    <div className={style.panelLeftForm__boxImg}></div>
                </div>
                <div className={style.panelRightForm}>
                    <div className={style.panelRightForm__boxLogo}></div>
                    <div className={style.panelRightForm__title}>New activity</div>
                    <div className={style.panelRightForm__formContainer}>
                        <div className={style.panelRightForm__formContainer__data}>
                            <div className={`${style.form__group2} ${style.field2}`}>
                                <input
                                    className={style.form__field2}
                                    type="text"
                                    title="The name's size must be a min 3, max 20 and must has only letters"
                                    autocomplete="off"
                                    name="name"
                                    value={activity.name}
                                    onChange={(e) => handleChangeName(e)}
                                />
                                <label className={style.form__label2}>Name</label>
                            </div>

                            <div className={`${style.form__group2} ${style.field2}`}>
                                <input
                                    className={style.form__field2}
                                    type="number"
                                    min="0.15"
                                    max="8"
                                    step="0.01"
                                    title='The activity must has a duration between 15 min and 8 hours'
                                    placeholder="hrs.min"
                                    name="duration"
                                    value={activity.duration}
                                    onChange={(e) => handleChange(e)}
                                />
                                <label className={style.form__label2}>Duration</label>
                            </div>

                            <div className={`${style.form__group2} ${style.field2}`}>
                                <select
                                    className={style.mySelector}
                                    name="difficult"
                                    value={activity.difficult}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="1">So easy</option>
                                    <option value="2">Easy</option>
                                    <option value="3" selected>Normal</option>
                                    <option value="4">Hard</option>
                                    <option value="5">So hard</option>
                                </select>
                                <label className={style.form__label3}>Difficult</label>
                            </div>

                            <div className={`${style.form__group2} ${style.field2}`}>
                                <select
                                    className={style.mySelector}
                                    name="season"
                                    value={activity.season}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="summer" selected>Summer</option>
                                    <option value="spring">Spring</option>
                                    <option value="autumn">Autumn</option>
                                    <option value="winter">Winter</option>
                                </select>
                                <label className={style.form__label3}>Season</label>
                            </div>

                            <div className={`${style.form__group2} ${style.field2}`}>
                                <select
                                    className={style.mySelector}
                                    name="countries"
                                    value={activity.countries}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="deafult" selected>Select country</option>
                                    {
                                        countries.length > 0 && countries.map(el =>
                                        {
                                            return (
                                                <option value={el.id}>{el.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label className={style.form__label3}>Countries</label>
                                <IconContext.Provider value={{size: "2.2vw" }}>
                                    <button onClick={(e) => addCountry(e)} className={style.formButton}>
                                        <SiAddthis style={{color: "#1A4D2E"}}/>
                                    </button>
                                </IconContext.Provider>
                            </div>

                            <div className={`${style.form__group2} ${style.field2}`}>
                                <div className={style.form__field3}>
                                    {
                                        addCountries.length > 0 && addCountries.map(el =>
                                            {
                                                return (
                                                    <div className={style.newCountry}>
                                                        <span>{el}</span>
                                                        <IconContext.Provider value={{size: "2.2vw" }}>
                                                            <button className={style.formButton2} onClick={() => deleteCountry(el)}>
                                                                <MdDeleteForever style={{color: "#b20c1a"}}/>
                                                            </button>
                                                        </IconContext.Provider>
                                                    </div>
                                                )
                                            })
                                    }
                                    <label className={style.form__label3}>List Countries</label>
                                </div>
                            </div>

                            <button className={style.buttonSend} disabled={Object.entries(errors).length === 0 ? false: true} onClick={(e) => handleSubmit(e)}>
                                <div class="svg-wrapper-1">
                                    <div class="svg-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z"/>
                                            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/>
                                        </svg>
                                    </div>
                                </div>
                                <span>Create</span>
                            </button>

                        </div>
                        <div className={style.panelRightForm__formContainer__error}>
                            <div className={`${style.errorName} ${style.boxError}`}>
                                {errors.name&&<p>{errors.name}</p>}
                            </div>
                            <div className={`${style.errorDuration} ${style.boxError}`}>
                                {errors.duration&&<p>{errors.duration}</p>}
                            </div>
                            <div className={`${style.errorDifficult} ${style.boxError}`}>
                                {errors.difficult&&<p>{errors.difficult}</p>}
                            </div>
                            <div className={`${style.errorSeason} ${style.boxError}`}>
                                {errors.season&&<p>{errors.season}</p>}
                            </div>
                            <div className={`${style.errorCountries} ${style.boxError}`}>
                                {errors.countries&&<p>{errors.countries}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
