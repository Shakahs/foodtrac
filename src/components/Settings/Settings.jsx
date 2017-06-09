import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatButton, Card, Snackbar } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import NotificationSubBtn from './NotificationSubBtn';
import SettingsTabs from './SettingsTabs';
import AddBrandsView from '../common/AddBrandsView';
import './Settings.scss';


class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOwnerNotification: false,
    };

    this.handleBecomeOwner = this.handleBecomeOwner.bind(this);
  }

  handleBecomeOwner(history) {
    this.props.userActions.userBecomeOwnerReq(this.props.user.id);
    history.push('/settings/addbrand');
    this.setState({ showOwnerNotification: true });
  }

  render() {
    return (
      <div className="row settings">
        <SettingsTabs is_truck_owner={this.props.user.is_truck_owner} />
        <Col xs={12}>
          <Card style={{ width: '100%' }}>
            <Switch>
              <Route
                path="/settings/addbrand"
                render={() =>
                  (this.props.auth.isLoggedIn && this.props.user.is_truck_owner
                    ? <AddBrandsView
                      foodGenres={this.props.foodGenres}
                      user={this.props.user}
                      userActions={this.props.userActions}
                    />
                    : null)}
              />
              <Route
                path="/settings/becomeOwner"
                render={({ history }) =>
                  (this.props.auth.isLoggedIn && !this.props.user.is_truck_owner
                    ? <div style={{ padding: '20px' }}>
                      <h2>Become a Brand Owner</h2>
                      <p>{'As a truck owner, you\'ll be able to add your own brands to Foodtrac.'}</p>
                      <FlatButton
                        onClick={() => this.handleBecomeOwner(history)}
                        label="Click here to become a brand owner"
                      />
                    </div>
                    : null)}
              />
              <Route
                path="/settings/notifications"
                component={NotificationSubBtn}
              />
              <Redirect from="/settings" exact to={this.props.is_truck_owner ? '/settings/addbrand' : '/settings/becomeOwner'} />
            </Switch>
            <Snackbar
              open={this.state.showOwnerNotification}
              autoHideDuration={3000}
              message="You are now a brand owner!"
            />
          </Card>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = ({ foodGenresReducer, user, auth }) => {
  const { foodGenres } = foodGenresReducer;
  return { foodGenres, user, auth };
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

Settings.propTypes = {
  userActions: propSchema.userActions,
  is_truck_owner: propSchema.is_truck_owner,
  foodGenres: propSchema.foodGenres,
  auth: propSchema.auth,
  user: propSchema.user,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
