import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/Login/login'
import Register from '../pages/Register/register'
import Home from '../pages/Home/home'
import View from '../pages/viewmovies/view'
import Favourite from '../pages/favourite/favourite'
import Cookies from 'js-cookie'

const AuthenticatedRoute = ({ component: Component, ...props }) => (
  <Route {...props} render={(props) => (
    Cookies.get('id') ? <Component {...props}></Component> : <Redirect to="/"></Redirect>
  )}></Route>
)

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Register} />
    <AuthenticatedRoute exact path="/home" component={Home} />
    <AuthenticatedRoute exact path="/view/:id/:title" component={View} />
    <AuthenticatedRoute exact path="/favourite" component={Favourite} />
  </Switch>
);

export default Routes;