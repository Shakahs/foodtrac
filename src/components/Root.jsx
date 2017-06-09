import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { actions as swActions } from '../redux/ServiceWorker';
import { actions as userActions } from '../redux/user';
import NavBar from './NavBar/NavBar';
import Routes from './Routes';
import propSchema from './common/PropTypes';
import './style.scss';
import Redirector from './Redirects';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      let swReg;
      console.log('Service Worker and Push is supported');
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          swReg = reg;
          return swReg.pushManager.getSubscription();
        })
        .then(subscription => this.props.dispatch(swActions.registeredServiceWorker(swReg, subscription)))
        .catch(e => console.log('Service worker error:', e));
    } else {
      console.warn('Push messaging is not supported');
    }
    setInterval(() => {
      if (this.props.isLoggedIn && this.props.user.id) {
        this.props.dispatch(userActions.requestUserData(this.props.user.id));
      }
    }, 300000);
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <NavBar />
            <Routes />
            <Redirector />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({ isLoggedIn: auth.isLoggedIn, user });
const mapDispatchToProps = dispatch => ({ dispatch });

Root.propTypes = {
  dispatch: propSchema.dispatch,
  isLoggedIn: propSchema.isLoggedIn,
  user: propSchema.user,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
