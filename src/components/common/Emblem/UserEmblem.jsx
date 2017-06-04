import React from 'react';
import Avatar from 'material-ui/Avatar';
import 'font-awesome/css/font-awesome.min.css';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import Emblem from './Emblem';
import propSchema from '../../common/PropTypes';
import './Emblem.scss';

class UserEmblem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;

    const userAvatar = (<Avatar
      icon={<FontIcon
        className="fa fa-user"
      />}
    />);
    return (
      <Emblem avatar={userAvatar}>
        {user.first_name} {user.last_name}
        {user.is_truck_owner &&
        <div className="truckOwnerByline">
          <Link to={`/brand/${user.brands[0].id}`} >
            <FontIcon className="fa fa-truck" style={{ fontSize: '1.2em' }} /> {user.brands[0].name}
          </Link>
          </div>
        }
      </Emblem>)
    ;
  }
}

UserEmblem.propTypes = {
  user: propSchema.user,
};

export default UserEmblem;
