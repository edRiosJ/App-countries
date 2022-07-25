import React from 'react';
import {Route, Switch} from 'react-router-dom';
import WelcomePage from './components/WelcomePage.jsx';
import PagePrincipal from './components/PagePrincipal';
import PageDetail from './components/PageDetail';
import PageForm from './components/PageForm'
import PageNotFound from './components/PageNotFound';
let style = require('./design/css/app.module.css');

function App()
{
  return (
    <React.Fragment>
      <div className={style.app}>
      <Switch>

        <Route exact path = {'/home'} component={WelcomePage}/>

        <Route exact path = {'/yourCountry/pages'} component={PagePrincipal}/>

        <Route exact path = {'/yourCountry/detailCountry/:idCountry'} component={PageDetail}/>

        <Route exact path = {'/yourCountry/newActivity'} component={PageForm}/>

        <Route path={'*'} component={PageNotFound}/>
      </Switch>

      </div>
    </React.Fragment>
  );
}

export default App;
