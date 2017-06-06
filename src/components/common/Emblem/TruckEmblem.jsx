import React from 'react';
import Avatar from 'material-ui/Avatar';
import 'font-awesome/css/font-awesome.min.css';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import Emblem from './Emblem';
import propSchema from '../../common/PropTypes';
import './Emblem.scss';

class TruckEmblem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { truck } = this.props;

    const truckAvatar = (<Avatar
      icon={<FontIcon
        className="fa fa-truck"
      />}
    />);
    return (
      <Emblem avatar={truckAvatar}>
        <div className="name">
          <Link to={`/brand/${truck.brands.id}`} >
            {truck.brands.name}
          </Link>
        </div>
      </Emblem>);
  }
}

TruckEmblem.propTypes = {
  truck: propSchema.truck,
};

export default TruckEmblem;
