import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatButton, Card } from 'material-ui';
import { Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import NotificationSubBtn from './NotificationSubBtn';
import SettingsSideBar from './SettingsSideBar';
import AddBrandsView from '../common/AddBrandsView';

const settingsPanelStyle = {
  display: 'inline-block',
  height: '80%',
  width: '100%',
};

const Settings = props => (
  <div className="row">
    <SettingsSideBar is_truck_owner={props.user.is_truck_owner} />
    <Col xs={12} sm={12} md={9} lg={9}>
      <Card style={settingsPanelStyle}>
        <Switch>
          <Route
            path="/settings/addbrand"
            render={() =>
              (props.auth.isLoggedIn && props.user.is_truck_owner
                ? <AddBrandsView
                  foodGenres={props.foodGenres}
                  user={props.user}
                  userActions={props.userActions}
                />
                : null)}
          />
          <Route
            path="/settings/becomeOwner"
            render={() =>
            (props.auth.isLoggedIn && !props.user.is_truck_owner
              ? <div>
                <h2>Become a Brand Owner</h2>
                <p>{'As a truck owner, you\'ll be able to add your own brands to Foodtrac.'}</p>
                <FlatButton
                  onClick={() => props.userActions.userBecomeOwnerReq(props.user.id)}
                  label="Click here to become a brand owner"
                />
              </div>
              : null)}
          />
          <Route
            path="/settings/notifications"
            component={NotificationSubBtn}
          />
        </Switch>
      </Card>
    </Col>
  </div>
);

const mapStateToProps = ({ foodGenresReducer, user, auth }) => {
  const { foodGenres } = foodGenresReducer;
  return { foodGenres, user, auth };
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

Settings.propTypes = {
  userActions: propSchema.userActions,
  foodGenres: propSchema.foodGenres,
  auth: propSchema.auth,
  user: propSchema.user,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
