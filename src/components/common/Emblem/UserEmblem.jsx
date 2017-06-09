import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FontIcon, Avatar } from 'material-ui';
import { Link } from 'react-router-dom';
import Emblem from './Emblem';
import propSchema from '../../common/PropTypes';
import './Emblem.scss';

class UserEmblem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;

    const userName = `${user.first_name} ${user.last_name}`;
    const userAvatar = (<FontIcon className="fa fa-user" />);
    const subtitle = (
      <div>
        <div>
          <FontIcon className="fa fa-star" style={{ fontSize: '1.2em' }} /> {user.brand_reviews ? user.brand_reviews.length : 0} Reviews
      </div>
        {user.is_truck_owner > 0 && user.brands && user.brands.length > 0 && (<div className="truckOwnerByline">
          <Link to={`/brand/${user.brands[0].id}`} >
            {this.props.user.brands[0].logo_image
              ? <Avatar
                src={`http://storage.googleapis.com/foodtrac/${this.props.user.brands[0].logo_image.filename}`}
                size={25}
              />
              : <FontIcon className="fa fa-truck" style={{ fontSize: '1.2em' }} />
            } {user.brands[0].name}
          </Link>
        </div>
      )}
      </div>
    );
    // const ownedTrucks = {}
    return (
      <Emblem avatar={userAvatar} title={userName} subtitle={subtitle} />)
    ;
  }
}

UserEmblem.propTypes = {
  user: propSchema.user,
};

export default UserEmblem;
