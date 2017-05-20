import React, { Component } from 'react';
import HomeLink from './HomeLink';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <HomeLink />
        <SearchBar />
        <UserMenu />
      </div>
    );
  }
}

export default NavBar;
