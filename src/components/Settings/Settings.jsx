import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SettingsSideBar from './SettingsSideBar';
import AddBrandsView from '../common/AddBrandsView';

const Settings = () => (
  <div>
    <p>Settings</p>
    <SettingsSideBar />
    <Switch>
      <Route path="/settings/addbrand" component={AddBrandsView} />
    </Switch>
  </div>
);

export default Settings;
