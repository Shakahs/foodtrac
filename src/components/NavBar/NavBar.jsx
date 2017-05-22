import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Login from './LoginButton';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      logged: true,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ logged: !this.state.logged });
  }

  render() {
    return (
      <div className="NavBar">
        <AppBar
          title="foodtrac"
          iconElementRight={
            <div>
              <SearchBar />
              {this.state.logged ? (
                <UserMenu handleLogin={this.handleLogin} />
              ) : <Login />}
            </div>
          }
        />
      </div>
    );
  }
}

export default NavBar;
