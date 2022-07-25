import React from 'react';
let style = require('../design/css/footer.module.css')

// export default function Footer()
// {
//     return (
//         <React.Fragment>
//             <div>
//                 <div>
//                     <img src={logo} alt="" />
//                 </div>
//             </div>
//             <div>
//                 <div>
//                     <a href="#">Linkdin</a>
//                     <a href="#">Twitter</a>
//                     <a href="#">Whatsapp</a>
//                 </div>
//             </div>
//             <div>
//                 <div>
//                     <p>Copyright</p>
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }

export default class Footer extends React.Component
{
    render()
    {
        return (
            <React.Fragment>
                <div className={style.contFooter}>
                    <div className={style.contFooter__contBoxImg}></div>
                    <div className={style.contFooter__contBoxSocial}>
                        <div className={style.socialWhats}>
                            <a href="#"></a>
                        </div>
                        <div className={style.socialLink}>
                            <a href="#"></a>
                        </div>
                        <div className={style.socialGit}>
                            <a href="#"></a>
                        </div>
                    </div>
                    <div className={style.contFooter__contBoxCopy}>
                        <p>Copyright &copy; 2022 Eduardo Rios</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}