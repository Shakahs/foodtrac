import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'font-awesome/css/font-awesome.min.css';
import { Popover, FlatButton, FontIcon, LinearProgress } from 'material-ui';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import { actions as authActions } from '../../redux/auth';
import { actions as foodGenresActions } from '../../redux/FoodGenres';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import LoginForm from '../Auth/LoginForm';
import UnauthorizedComponent from '../common/Helpers/UnauthorizedComponent';
import './NavBar.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      menuOpen: false,
      loginMenuOpen: false,
      searchWindowOpen: false,
      height: screen.availHeight,
      width: screen.availWidth,
    };
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleLoginTouchTap = this.handleLoginTouchTap.bind(this);
    this.handleSearchTouchTap = this.handleSearchTouchTap.bind(this);
    this.handleLoginRequestClose = this.handleLoginRequestClose.bind(this);
    this.handleSearchRequestClose = this.handleSearchRequestClose.bind(this);
  }

  componentDidMount() {
    this.props.foodGenresActions.foodGenresRequest();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      height: screen.availHeight,
      width: screen.availWidth,
    });
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
      loginAnchorEl: event.currentTarget,
    });
  }

  handleSearchTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      searchWindowOpen: true,
      searchAnchorEl: event.currentTarget,
    });
  }

  handleSearchRequestClose() {
    this.setState({
      searchWindowOpen: false,
    });
  }

  handleLoginRequestClose() {
    this.setState({
      loginMenuOpen: false,
    });
  }

  render() {
    return (
      <div>
        <Grid fluid className="NavBar">
          <UserMenu
            handleLogout={this.props.authActions.logout}
            handleMenuToggle={this.handleMenuToggle}
            handleMenuClose={this.handleMenuClose}
            handleMenuChange={this.handleMenuChange}
            menuOpen={this.state.menuOpen}
          />
          <Row style={{ width: '100%', margin: 0 }}>
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
            <Col xs={4} sm={4} md={7} lg={7}>
              {this.state.width > 800 && <SearchBar />}
            </Col>
            {this.state.width < 800 &&
            <Col xs={2} sm={2} className="centered-span-container">
              <FlatButton
                className="nav-btn"
                label={<FontIcon className="fa fa-search center-span" />}
                onTouchTap={e => this.handleSearchTouchTap(e)}
              />
              <Popover
                open={this.state.searchWindowOpen}
                anchorEl={this.state.searchAnchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleSearchRequestClose}
              >
                <SearchBar />
                {/*<LoginForm onSubmit={this.props.authActions.loginRequest} />*/}
              </Popover>
            </Col>}
            <Col xs={3} sm={3} md={2} lg={2} className="relative">
              <UnauthorizedComponent>
                <FlatButton
                  className="nav-btn"
                  label={<span className="login-btn"><FontIcon className="fa fa-sign-in" /> {this.state.width > 800 ? 'Login' : ''}</span>}
                  onTouchTap={this.handleLoginTouchTap}
                />
                <Popover
                  open={this.state.loginMenuOpen}
                  anchorEl={this.state.loginAnchorEl}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  onRequestClose={this.handleLoginRequestClose}
                >
                  <LoginForm onSubmit={this.props.authActions.loginRequest} />
                </Popover>
              </UnauthorizedComponent>
            </Col>
          </Row>
        </Grid>
        {this.props.loading
          ? <LinearProgress mode="indeterminate" />
          : null
        }
      </div>
    );
  }
}

NavBar.propTypes = {
  authActions: propSchema.authActions,
  foodGenresActions: propSchema.foodGenresActions,
  loading: propSchema.loading,
};

const mapStateToProps = state => ({
  user: state.user,
  isLoggedIn: state.auth.isLoggedIn,
  loading: state.loading.loading,
});


const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
  foodGenresActions: bindActionCreators(foodGenresActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
