import React from 'react';
import { useParams } from 'react-router-dom'
import { FcLandscape, FcConferenceCall, FcGlobe } from "react-icons/fc";
import { BsSpeedometer, BsClock, BsFillCalendarMonthFill } from "react-icons/bs";
import { IconContext  } from "react-icons";
let style = require('../design/css/detailPanel.module.css');
require('dotenv').config();

const URL = process.env.REACT_APP_URL === 'production' ? 'https://app--countries.herokuapp.com' : 'http://localhost:3001';

export default function CountryCard()
{
    const { idCountry } = useParams();

    let [country, setCountry] = React.useState(
        {
            imageFlag: '',
            name: '',
            id: '',
            continent: '',
            capital: '',
            subregion: '',
            area: null,
            population: null,
            activities: []
        })

    React.useEffect(() =>
    {
        fetch(`${URL}/countries/${idCountry}`)
        .then(res => res.json())
        .then(data =>
            {
                let myMap = {
                            imageFlag: data.imageFlag,
                            name: data.name,
                            id: data.id,
                            continent: data.continent,
                            capital: data.capital,
                            subregion: data.subregion,
                            area: data.area,
                            population: data.population,
                            activities: data.activities
                        }
                setCountry(myMap);
            })
    },[]);

    let renderActivities = country.activities === undefined ? <div><p>Loading</p></div> :
                    country.activities.length === 0 ? <div className={style.notActivity}><p>This country doesn't has activities</p></div> :
                    country.activities && country.activities.map(el =>{
                        return (
                            <div key={el.id} className={style.cardActivity}>
                                <div className={style.cardActivity__name}>
                                    <p>{el.name}</p>
                                </div>
                                <IconContext.Provider value={{size: "2.6vw", color: "#b20c1a"}}>

                                <div className={style.cardActivity__divDifficult}>
                                    <div className={style.cardActivity__iconDifficult}><BsSpeedometer/></div>
                                    <p className={style.cardActivity__difficult}>{el.difficult}</p>
                                </div>
                                <div className={style.cardActivity__divDuration}>
                                    <p className={style.cardActivity__duration}>{el.duration}</p>
                                    <div className={style.cardActivity__iconDuration}><BsClock/></div>
                                </div>
                                <div className={style.cardActivity__divSeason}>
                                    <div className={style.cardActivity__iconSeason}><BsFillCalendarMonthFill/></div>
                                    <p className={style.cardActivity__difficult}>{el.season}</p>
                                </div>
                                </IconContext.Provider>
                            </div>
                        );
                    })

    return (
        <React.Fragment>
            {
                country.id ?
                    <div className={style.countryCard}>
                        <div className={style.countryCard__mainInfo}>
                            <div className={style.countryCard__imgBox}>
                                <img src={country.imageFlag} alt={country.name}/>
                            </div>
                            <div className={style.countryCard__contInfo}>
                                <p className={style.countryCard__name}>{`${country.name} (${country.id})`}</p>
                                <p className={style.countryCard__capital}>{country.capital}</p>
                                <IconContext.Provider value={{size: "3vw"}}>
                                    <FcGlobe/>
                                </IconContext.Provider>
                                <p className={style.countryCard__continent}>{country.subregion ?`${country.continent} (${country.subregion})`: country.continent}</p>
                                <IconContext.Provider value={{size: "3vw"}}>
                                    <p className={style.countryCard__infoArea}><span className={style.iconBox}><FcLandscape/></span>{`${country.area}.0 km2`}</p>
                                    <p className={style.countryCard__infoPopulation}><span className={style.iconBox}><FcConferenceCall/></span> {country.population}</p>
                                </IconContext.Provider>
                            </div>
                        </div>
                        <div className={style.cardsActivities}>
                            {renderActivities}
                        </div>
                    </div>
                :
                <div className={style.loading}></div>
            }
        </React.Fragment>
    )
}