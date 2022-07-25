import React from 'react';
import NavBar from '../components/NavBar.jsx';
import LeftPanel from '../components/LeftPanel.jsx';
import ContentPanel from '../components/ContentPanel.jsx';
import Footer from '../components/Footer.jsx';
import style from '../design/css/dristributionComponents.module.css';

export default function PageForm()
{
    return (
        <React.Fragment>
            <div className={style.grid}>
                <div className={style.grid__header}>
                    <NavBar typeBar="secondary"/>
                </div>

                <div className={style.grid__article}>
                    <LeftPanel typeLeft="secondary"/>
                </div>

                <div className={style.grid__section}>
                    <ContentPanel typeContent="showForm"/>
                </div>

                <div className={style.grid__footer}>
                    <Footer/>
                </div>
            </div>
        </React.Fragment>
    )
}