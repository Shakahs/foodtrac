import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'font-awesome/css/font-awesome.min.css';
import UserEmblem from '../common/Emblem/UserEmblem';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import { actions as authActions } from '../../redux/auth';
import { actions as foodGenresActions } from '../../redux/FoodGenres';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
// import Login from './LoginButton';
import SiteHeader from './SiteHeader';
import AuthorizedComponent from '../common/AuthHelpers/AuthorizedComponent';
import UnauthorizedComponent from '../common/AuthHelpers/UnauthorizedComponent';
import './NavBar.scss';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      menuOpen: false,
    };
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  componentDidMount() {
    this.props.foodGenresActions.foodGenresRequest();
  }

  handleMenuToggle() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleMenuClose() { this.setState({ menuOpen: false }); }

  handleMenuChange(open) { this.setState({ menuOpen: open }); }

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
        <Row>
          <Col xs={2} md={2} lg={2}>
            <SiteHeader handleMenuToggle={this.handleMenuToggle} />
          </Col>
          <Col xs={5} md={8} lg={8}>
            <SearchBar />
          </Col>
          <Col xs={5} md={2} lg={2} >
            <AuthorizedComponent>
              <div>
                <UserEmblem user={this.props.user} />
                <UserMenu handleLogout={this.props.authActions.logout} />
              </div>
            </AuthorizedComponent>
            <UnauthorizedComponent>
              <div>
                {/* <Login onSubmit={this.props.authActions.loginRequest} />*/}
                <Link to="/signup">
                  <p>Log in / Sign up</p>
                </Link>
              </div>
            </UnauthorizedComponent>
          </Col>
        </Row>
      </Grid>
    );
  }
}

NavBar.propTypes = {
  user: propSchema.user,
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
