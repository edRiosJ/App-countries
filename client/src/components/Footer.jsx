import React from 'react';
import { IoLogoWhatsapp, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { IconContext  } from "react-icons";
let style = require('../design/css/footer.module.css')

export default class Footer extends React.Component
{
    render()
    {
        return (
            <React.Fragment>
                <IconContext.Provider value={{size: "2vw" }}>
                    <div className={style.contFooter}>
                        <div className={style.contFooter__contBoxImg}></div>
                        <div className={style.contFooter__contBoxSocial}>
                            <a href="https://api.whatsapp.com/send?phone=2211805708" target="_blank"><IoLogoWhatsapp style={{ color: "green"}}/></a>
                            <a href="https://github.com/edRiosJ" target="_blank"><IoLogoGithub style={{ color: "gray"}}/></a>
                            <a href="https://mx.linkedin.com" target="_blank"><IoLogoLinkedin style={{ color: "blue"}}/></a>
                        </div>
                        <div className={style.contFooter__contBoxCopy}>
                            <p>Copyright &copy; 2022 Eduardo Rios</p>
                        </div>
                    </div>
                </IconContext.Provider>
            </React.Fragment>
        )
    }
}