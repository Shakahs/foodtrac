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
        <div className="userName">{user.first_name} {user.last_name}</div>
        {user.is_truck_owner > 0 && user.brands && (<div className="truckOwnerByline">
          <Link to={`/brand/${user.brands[0].id}`} >
            <FontIcon className="fa fa-truck" style={{ fontSize: '1.2em' }} /> {user.brands[0].name}
          </Link>
          </div>
        )}
        <div>
          <FontIcon className="fa fa-star" style={{ fontSize: '1.2em' }} /> {user.brand_reviews ? user.brand_reviews.length : 0} Reviews
        </div>
      </Emblem>)
    ;
  }
}

UserEmblem.propTypes = {
  user: propSchema.user,
};

export default UserEmblem;
