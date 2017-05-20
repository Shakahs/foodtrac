import React, { Component } from 'react';
import Cover from './Cover';
import ProfileInfo from './ProfileInfo';
import TabView from './TabView';

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Cover />
        <ProfileInfo />
        <TabView />
      </div>
    );
  }
}

export default Profile;
