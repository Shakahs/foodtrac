import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as userActions } from '../../redux/user';
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

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
