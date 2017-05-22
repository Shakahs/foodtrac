import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
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
      <Grid fluid>
        <Row>
          <Cover />
        </Row>
        <Row>
          <ProfileInfo />
          <TabView />
        </Row>
      </Grid>
    );
  }
}

export default Profile;
