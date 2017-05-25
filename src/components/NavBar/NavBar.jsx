import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions as userActions } from '../../redux/user';
import { actions as authActions } from '../../redux/auth';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Login from './LoginButton';


class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      logged: false,
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
            <div className="navBarRight">
              <SearchBar />
              {this.props.isLoggedIn ? (
                <UserMenu handleLogout={this.props.authActions.logout} />
              ) : <Login onSubmit={this.props.authActions.loginRequest} />}
            </div>
          }
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  authActions: PropTypes.shape({ logout: PropTypes.func, loginRequest: PropTypes.func }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});


const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
