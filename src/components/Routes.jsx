import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from './DashBoard/DashBoard';
import MapPage from './MapPage/MapPage';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import FoodOrder from './FoodOrder/FoodOrder';
import SignUp from './SignUp';
import Events from './Events';

class Routes extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="app-content">
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/map" component={MapPage} />
          <Route path="/brand/:brandId" component={Profile} />
          <Route path="/settings" component={Settings} />
          <Route path="/signup" component={SignUp} />
          <Route path="/order/:truckId" component={FoodOrder} />
          <Route path="/events" component={Events} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
