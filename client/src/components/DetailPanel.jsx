import React from 'react';
import { useParams } from 'react-router-dom'
let style = require('../design/css/detailPanel.module.css');

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
        fetch(`http://localhost:3001/countries/${idCountry}`)
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
                                <div className={style.cardActivity__divDifficult}>
                                    <div className={style.cardActivity__iconDifficult}></div>
                                    <p className={style.cardActivity__difficult}>{el.difficult}</p>
                                </div>
                                <div className={style.cardActivity__divDuration}>
                                    <p className={style.cardActivity__duration}>{el.duration}</p>
                                    <div className={style.cardActivity__iconDuration}></div>
                                </div>
                                <div className={style.cardActivity__divSeason}>
                                    <div className={style.cardActivity__iconSeason}></div>
                                    <p className={style.cardActivity__difficult}>{el.season}</p>
                                </div>
                            </div>
                        );
                    })

    return (
        // <React.Fragment>
        //     {
        //         country.id ?
        //             <div className={style.countryCard}>
        //                 <div className={style.countryCard__imgBox}>
        //                     <img src={country.imageFlag} alt={country.name}/>
        //                 </div>
        //                 <div className={style.countryCard__contInfo}>
        //                     <p className={style.countryCard__name}>{`${country.name} (${country.id})`}</p>
        //                     <p className={style.countryCard__capital}>{country.capital}</p>
        //                     <p className={style.countryCard__continent}>{`${country.continent} (${country.subregion})`}</p>
        //                     <div className={style.countryCard__contInfoSec}>
        //                         <div className={style.countryCard__infoSec_left}>
        //                                 <div className={style.countryCard__boxGif}></div>
        //                                 <p className={style.countryCard__infoArea}>{`${country.area}.0 km2`}</p>
        //                         </div>
        //                         <div className={style.countryCard__infoSec_right}>
        //                             <div className={style.countryCard__boxGif_2}></div>
        //                             <p className={style.countryCard__infoPopulation}>{country.population}</p>
        //                         </div>
        //                     </div>
        //                     <div className={style.cardsActivities}>
        //                         {renderActivities}
        //                     </div>
        //                 </div>
        //             </div>
        //         :
        //         <div className={style.loading}></div>
        //     }
        // </React.Fragment>
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
                                <p className={style.countryCard__continent}>{`${country.continent} (${country.subregion})`}</p>
                            </div>
                        </div>
                    </div>
                :
                <div className={style.loading}></div>
            }
        </React.Fragment>
    )
}