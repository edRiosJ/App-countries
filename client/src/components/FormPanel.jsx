import React from 'react';
let style = require('../design/css/formPanel.module.css');

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
        fetch('http://localhost:3001/countries/')
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
            fetch('http://localhost:3001/activities', {
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
                    if(res.hasOwnProperty('msg')) alert(res.msg);
                    else alert(res.error);
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
        if(activity.name === '') errors.name = 'Insert the name';
        if(!regexName.test(activity.name)) errors.name = 'The name must has only letters';
        // if(activity.name.length < 3 || activity.name.length > 20) errors.name = "The name's size isn't valid";

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
    }

    function deleteCountry(id)
    {
        let newList = addCountries.filter(country => country !== id);
        setAddCountries(newList);
    }

    return (
        <React.Fragment>
            <div className={style.panelLeftForm}>
                <div className={style.panelLeftForm__boxImg}>
                    {errors.name&&<p>{errors.name}</p>}
                    {errors.duration&&<p>{errors.duration}</p>}
                    {errors.difficult&&<p>{errors.difficult}</p>}
                    {errors.season&&<p>{errors.season}</p>}
                    {errors.countries&&<p>{errors.countries}</p>}
                </div>
                    </div>
                    <div className={style.panelRightForm}>
                        <form>
                            <div className={style.nameForm}>
                                <p>New activity</p>
                            </div>

                            <div className={style.form__part_1}>
                                <div className={style.form__part_1_name}>
                                    <span>Name: </span>
                                    <input
                                        className={style.form__inputName}
                                        type="text"
                                        title="The name's size must be a min 3, max 20 and must has only letters"
                                        autocomplete="off"
                                        name="name"
                                        value={activity.name}
                                        onChange={(e) => handleChangeName(e)}
                                    />
                                </div>

                                <div className={style.form__part_1_duration}>
                                    <span>Duration: </span>
                                    <input
                                        className={style.form__inputName}
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
                                </div>
                                </div>

                                <div className={style.form__part_2}>
                                    <div className={style.form__part_1_name}>
                                        <span>Difficult: </span>
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
                                    </div>

                                    <div className={style.form__part_1_duration}>
                                        <span>Season: </span>
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
                                    </div>
                                </div>

                                <div className={style.form__part_3}>
                                    <span>Countries: </span>
                                    <select
                                        className={style.mySelector2}
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
                                    <button onClick={(e) => addCountry(e)}>Add country</button>
                                </div>

                                <div className={style.contPoolCountries}>
                                    <p>List of countries:</p>
                                    <div className={style.poolCountries}>
                                        {
                                            addCountries.length > 0 && addCountries.map(el =>
                                                {
                                                    return (
                                                        <div className={style.newCountry}>
                                                            <span>{el}</span>
                                                            <button type="button" onClick={() => deleteCountry(el)}>X</button>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                                <button disabled={Object.entries(errors).length === 0 ? false: true}
                                    onClick={(e) => handleSubmit(e)}>Create activity</button>
                            </form>
                    </div>
                </React.Fragment>
        )
}
