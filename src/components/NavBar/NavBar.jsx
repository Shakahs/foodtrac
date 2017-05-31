import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import { actions as authActions } from '../../redux/auth';
import { actions as foodGenresActions } from '../../redux/FoodGenres';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Login from './LoginButton';
import './NavBar.scss';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      logged: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.props.foodGenresActions.foodGenresRequest();
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
              ) : (
                <div>
                  <Login onSubmit={this.props.authActions.loginRequest} />
                  <Link to="/signup">
                    <p>Sign up</p>
                  </Link>
                </div>)}
            </div>
          }
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  authActions: propSchema.authActions,
  isLoggedIn: propSchema.isLoggedIn,
  foodGenresActions: propSchema.foodGenresActions,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});


const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
  foodGenresActions: bindActionCreators(foodGenresActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
