import React from 'react';
import Avatar from 'material-ui/Avatar';
import 'font-awesome/css/font-awesome.min.css';
import FontIcon from 'material-ui/FontIcon';
import Emblem from './Emblem';
import propSchema from '../../common/PropTypes';

class UserEmblem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const userAvatar = (<Avatar
      icon={<FontIcon
        className="fa fa-user"
      />}
    />);
    return (
      <Emblem avatar={userAvatar}>
        {this.props.user.first_name} {this.props.user.last_name}
      </Emblem>)
    ;
  }
}

UserEmblem.propTypes = {
  user: propSchema.user,
};

export default UserEmblem;
