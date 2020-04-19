import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/login'
import Register from '../pages/Register/register'
import Home from '../pages/Home/home'
import View from '../pages/viewmovies/view'
import Favourite from '../pages/favourite/favourite'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/view/:id/:title" component={View} />
    <Route exact path="/favourite" component={Favourite} />
  </Switch>
);

export default Routes;