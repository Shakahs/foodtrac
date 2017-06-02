import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from './DashBoard/DashBoard';
import MapPage from './MapPage/MapPage';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import Settings from './Settings/Settings';
import FoodOrder from './FoodOrder/FoodOrder';
import SignUp from './SignUp';

class Routes extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={DashBoard} />
        <Route path="/map" component={MapPage} />
        <Route path="/brand/:brandId" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/signup" component={SignUp} />
        <Route path="/order/:truckId" component={FoodOrder} />
      </Switch>
    );
  }
}

export default Routes;
