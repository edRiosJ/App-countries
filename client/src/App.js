import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import MediaPanel from './components/MediaPanel.jsx';
import CountriesPanel from './components/CountriesPanel.jsx';
import DetailPanel from './components/DetailPanel.jsx';
let style = require('./design/css/app.module.css');

function App()
{
  return (
    <React.Fragment>
      <Switch>
        <div className={style.app}>

          <Route path = {'/'}>
            <div className={style.header}>
              <NavBar/>
            </div>

            <div className={style.footer}>
              <Footer/>
            </div>
          </Route>

          <Route exact path = {'/'}>
            <div className={style.mainBody}>
              <MediaPanel/>
              <FilterPanel/>
              <CountriesPanel/>
            </div>
          </Route>

          <Route exact path = {'/detailCountry/:idCountry'}>
            <div className={style.secondaryBody}>
              <DetailPanel/>
            </div>
          </Route>

          <Route exact path = {'/newActivity'} >
            <div className={style.thirdBody}>

            </div>
          </Route>

          <Route path={'*'} className={style.errorBody}/>
        </div>
      </Switch>
    </React.Fragment>
  );
}

export default App;
