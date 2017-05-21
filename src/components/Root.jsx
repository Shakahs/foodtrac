import React, { Component } from 'react';
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
      <div>
        <NavBar />
        <Routes />
      </div>
    );
  }
}

export default Root;
