import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'font-awesome/css/font-awesome.min.css';
import { Popover, FlatButton, FontIcon } from 'material-ui';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import { actions as authActions } from '../../redux/auth';
import { actions as foodGenresActions } from '../../redux/FoodGenres';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Login from './LoginButton';
import UnauthorizedComponent from '../common/Helpers/UnauthorizedComponent';
import './NavBar.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      menuOpen: false,
      loginMenuOpen: false,
    };
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleLoginTouchTap = this.handleLoginTouchTap.bind(this);
    this.handleLoginRequestClose = this.handleLoginRequestClose.bind(this);
  }

  componentDidMount() {
    this.props.foodGenresActions.foodGenresRequest();
  }

  handleMenuToggle(e) {
    e.preventDefault();
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleMenuClose() { this.setState({ menuOpen: false }); }

  handleMenuChange(open) { this.setState({ menuOpen: open }); }

  handleLoginTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      loginMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleLoginRequestClose() {
    this.setState({
      loginMenuOpen: false,
    });
  }

  render() {
    return (
      <Grid fluid className="NavBar">
        <UserMenu
          handleLogout={this.props.authActions.logout}
          handleMenuToggle={this.handleMenuToggle}
          handleMenuClose={this.handleMenuClose}
          handleMenuChange={this.handleMenuChange}
          menuOpen={this.state.menuOpen}
        />
        <Row style={{ width: '100%' }}>
          <Col xs={1} sm={1} md={1} lg={1} className="centered-span-container">
            <FontIcon
              className="fa fa-bars center-span"
              hoverColor="#00bcd4"
              onTouchTap={this.handleMenuToggle}
            />
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <Link to="/" className="site-header center-span">
              foodtrac
            </Link>
          </Col>
          <Col xs={7} sm={7} md={7} lg={7}>
            <SearchBar />
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} className="relative">
            <UnauthorizedComponent>
              <FlatButton
                label="Log In / Sign Up"
                onTouchTap={this.handleLoginTouchTap}
              />
              <Popover
                open={this.state.loginMenuOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleLoginRequestClose}
              >
                <Login onSubmit={this.props.authActions.loginRequest} />
              </Popover>
            </UnauthorizedComponent>
          </Col>
        </Row>
      </Grid>
    );
  }
}

NavBar.propTypes = {
  authActions: propSchema.authActions,
  foodGenresActions: propSchema.foodGenresActions,
};

const mapStateToProps = state => ({
  user: state.user,
  isLoggedIn: state.auth.isLoggedIn,
});


const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
  foodGenresActions: bindActionCreators(foodGenresActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
