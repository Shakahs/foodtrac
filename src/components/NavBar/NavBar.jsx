import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      logged: true,
    };
  }

  render() {
    return (
      <div className="NavBar">
        <AppBar
          title="foodtrac"
          iconElementRight={
            this.state.logged ? (
              <div>
                <SearchBar />
                <UserMenu />
              </div>
            ) : <div>LOGIN</div>
          }
        />
      </div>
    );
  }
}

export default NavBar;
