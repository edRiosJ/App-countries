import React from 'react';
import { useParams } from 'react-router-dom';
import style from '../design/css/typeGame.module.css';

export default function TypeGame()
{
    const {idGame} = useParams();

    return (
        <React.Fragment>
            <div className={style.containerTypeGame}>
                {idGame}
                <div className={style.TypeGameImg}>

                </div>
            </div>
        </React.Fragment>
    )
}