import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar/NavBar';
import Routes from './Routes';
import './style.scss';

class Root extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Root;
