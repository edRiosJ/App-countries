import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCountries} from '../redux/actions.js';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { IconContext  } from "react-icons";
import NotFound from './NotFound';
let style = require('../design/css/countriesPanel.module.css');

export default function Pagination()
{
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);

    let [currentPage, setCurrentPage] = React.useState(1);
    let [cardsPerPage, setCardsPerPage] = React.useState(10);
    let [pageNumberLimit, setPageNumberLimit] = React.useState(5);
    let [maxPageNumberLimit, setMaxPageNumberLimit] = React.useState(5);
    let [minPageNumberLimit, setMinPageNumberLimit] = React.useState(0);

    let indexOfLastCard;
    let indexOfFirstCard;
    let currentCards;

    if(filters.hasOwnProperty('error') === false)
    {
        indexOfLastCard = currentPage === 1 ? currentPage * (cardsPerPage - 1) : currentPage * cardsPerPage;
        indexOfFirstCard = currentPage === 1 ? indexOfLastCard - (cardsPerPage - 1) : indexOfLastCard - cardsPerPage;
        currentCards = currentPage === 1 ? filters.slice(indexOfFirstCard, indexOfLastCard) : filters.slice(indexOfFirstCard-1, indexOfLastCard-1);
    }

    let pages = [];
    let pageIncrementBtn = null;
    let pageDecrementBtn = null;

    React.useEffect(() =>
    {
            if (filters.length === 0)
            {
                dispatch(getAllCountries());
            }
            setCurrentPage(1);
    },[filters]);

    for (let i = 1; i <= Math.ceil(filters.length / cardsPerPage); i++)
    {
        pages.push(i);
        if(i === 1) console.log(filters.length);
    }

    if (pages.length > maxPageNumberLimit)  pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>;
    if (minPageNumberLimit >= 1) pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>;

    function handleClick(e)
    {
        setCurrentPage(Number(e.target.id));
    }

    function handleNextBtn()
    {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit)
        {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    function handlePrevBtn()
    {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0)
        {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const renderPageNumbers = pages.map((number) =>
    {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit)
        {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={(e) => handleClick(e)}
                    className={currentPage === number ? style.active : null}
                >
                    {number}
                </li>
            );
        }
        else return null;
      });

    let controlPagination = (
        <ul className={style.contControlPagination}>
            <li>
                <button
                    onClick={handlePrevBtn}
                    disabled={currentPage === pages[0] ? true : false}
                    className={style.contControlPagination__Btn}
                >
                <IconContext.Provider value={{size: "1.5vw" }}>
                    <div className={style.boxIcon}><MdOutlineArrowBackIosNew style={{ color: "#1A4D2E"}}/></div>
                </IconContext.Provider>
                </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button
                    onClick={handleNextBtn}
                    disabled={currentPage === pages[pages.length - 1] ? true : false}
                    className={style.contControlPagination__Btn}
                >
                <IconContext.Provider value={{size: "1.5vw" }}>
                    <div className={style.boxIcon}><MdOutlineArrowForwardIos style={{ color: "#1A4D2E"}}/></div>
                </IconContext.Provider>
                </button>
            </li>
        </ul>);

    return (
        <React.Fragment>
            {controlPagination}
            <div className={style.contCards}>
                {
                    filters.hasOwnProperty('error')? <div><NotFound/></div>:
                    filters.length < 1 ? <div className={style.charging}/>:
                    currentCards&&currentCards.map(e =>
                    {
                        return (
                            <div key={e.id}className={style.card}>
                                <Link to={`/detailCountry/${e.id}`}>
                                    <div className={style.card__imgBox}>
                                        <img src={e.imageFlag} alt={e.name}/>
                                    </div>
                                    <div className={style.card__contInfo}>
                                            <p className={style.nameP}>{e.name}</p>
                                            <p className={style.nameC}>{e.continent}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            {controlPagination}
        </React.Fragment>
    )
}