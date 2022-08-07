import React from 'react';
import {Link} from 'react-router-dom';
import { IoGameController } from "react-icons/io5";
import { IconContext  } from "react-icons";

import style from '../design/css/gamePanel.module.css';

export default function GamePanel()
{
    return (
        <React.Fragment>
            <div className={style.containerGames}>
                <div className={style.containerOptionsGmae}>
                    <IconContext.Provider value={{size: "2vw", color: "orangered", className: `${style.iconConf}`}}>
                        <Link to={'/games/1'}>
                            <button className={style.buttonGames}>
                                <IoGameController/>
                                <p>Guess the country</p>
                            </button>
                        </Link>

                        <Link to={'/games/2'}>
                            <button className={style.buttonGames}>
                                <IoGameController/>
                                <p>Guess the continent</p>
                            </button>
                        </Link>

                        <Link to={'/games/3'}>
                            <button className={style.buttonGames}>
                                <IoGameController/>
                                <p>+Population</p>
                            </button>
                        </Link>
                    </IconContext.Provider>
                </div>

                <div className={style.containerScoreTables}>
                    <div className={style.tableScore}>
                        <p>Scores 'Guess the country'</p>
                        <ul className={style.table}>
                            <li className={style.tableHeader}>
                                <div className={style.col1}>Pos</div>
                                <div className={style.col2}>Nick</div>
                                <div className={style.col3}>Score</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>1</div>
                                <div className={style.col2}>User1</div>
                                <div className={style.col3}>24000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>2</div>
                                <div className={style.col2}>User2</div>
                                <div className={style.col3}>23000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>3</div>
                                <div className={style.col2}>User3</div>
                                <div className={style.col3}>22000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>4</div>
                                <div className={style.col2}>User4</div>
                                <div className={style.col3}>21000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>5</div>
                                <div className={style.col2}>User5</div>
                                <div className={style.col3}>20000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>6</div>
                                <div className={style.col2}>User6</div>
                                <div className={style.col3}>19000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>7</div>
                                <div className={style.col2}>User7</div>
                                <div className={style.col3}>18000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>8</div>
                                <div className={style.col2}>User8</div>
                                <div className={style.col3}>17000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>9</div>
                                <div className={style.col2}>User9</div>
                                <div className={style.col3}>16000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>10</div>
                                <div className={style.col2}>User10</div>
                                <div className={style.col3}>15000 pts</div>
                            </li>
                        </ul>
                    </div>
                    <div className={style.tableScore}>
                    <p>Scores 'Guess the continet'</p>
                    <ul className={style.table}>
                            <li className={style.tableHeader}>
                                <div className={style.col1}>Pos</div>
                                <div className={style.col2}>Nick</div>
                                <div className={style.col3}>Score</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>1</div>
                                <div className={style.col2}>User1</div>
                                <div className={style.col3}>24000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>2</div>
                                <div className={style.col2}>User2</div>
                                <div className={style.col3}>23000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>3</div>
                                <div className={style.col2}>User3</div>
                                <div className={style.col3}>22000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>4</div>
                                <div className={style.col2}>User4</div>
                                <div className={style.col3}>21000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>5</div>
                                <div className={style.col2}>User5</div>
                                <div className={style.col3}>20000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>6</div>
                                <div className={style.col2}>User6</div>
                                <div className={style.col3}>19000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>7</div>
                                <div className={style.col2}>User7</div>
                                <div className={style.col3}>18000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>8</div>
                                <div className={style.col2}>User8</div>
                                <div className={style.col3}>17000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>9</div>
                                <div className={style.col2}>User9</div>
                                <div className={style.col3}>16000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>10</div>
                                <div className={style.col2}>User10</div>
                                <div className={style.col3}>15000 pts</div>
                            </li>
                        </ul>
                    </div>
                    <div className={style.tableScore}>
                    <p>Scores '+Population'</p>
                    <ul className={style.table}>
                            <li className={style.tableHeader}>
                                <div className={style.col1}>Pos</div>
                                <div className={style.col2}>Nick</div>
                                <div className={style.col3}>Score</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>1</div>
                                <div className={style.col2}>User1</div>
                                <div className={style.col3}>24000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>2</div>
                                <div className={style.col2}>User2</div>
                                <div className={style.col3}>23000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>3</div>
                                <div className={style.col2}>User3</div>
                                <div className={style.col3}>22000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>4</div>
                                <div className={style.col2}>User4</div>
                                <div className={style.col3}>21000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>5</div>
                                <div className={style.col2}>User5</div>
                                <div className={style.col3}>20000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>6</div>
                                <div className={style.col2}>User6</div>
                                <div className={style.col3}>19000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>7</div>
                                <div className={style.col2}>User7</div>
                                <div className={style.col3}>18000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>8</div>
                                <div className={style.col2}>User8</div>
                                <div className={style.col3}>17000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>9</div>
                                <div className={style.col2}>User9</div>
                                <div className={style.col3}>16000 pts</div>
                            </li>

                            <li className={style.tableRow}>
                                <div className={style.col1}>10</div>
                                <div className={style.col2}>User10</div>
                                <div className={style.col3}>15000 pts</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}