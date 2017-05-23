import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <NavBar />
            <Routes />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default Root;
