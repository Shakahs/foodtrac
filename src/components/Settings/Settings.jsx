import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import SettingsSideBar from './SettingsSideBar';
import AddBrandsView from '../common/AddBrandsView';
// TODO: only display addbrandsview if user is truck owner, else have option for them to become a truck owner
const Settings = props => (
  <div>
    <p>Settings</p>
    <SettingsSideBar />
    <Switch>
      <Route
        path="/settings/addbrand"
        render={() =>
          (<AddBrandsView
            foodGenres={props.foodGenres}
            user={props.user}
            userActions={props.userActions}
          />)}
      />
    </Switch>
  </div>
);

const mapStateToProps = ({ foodGenresReducer, user }) => {
  const { foodGenres } = foodGenresReducer;
  return { foodGenres, user };
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

Settings.propTypes = {
  userActions: propSchema.userActions,
  foodGenres: propSchema.foodGenres,
  user: propSchema.user,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
